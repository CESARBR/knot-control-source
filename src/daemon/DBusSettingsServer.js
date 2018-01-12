import dbus from 'dbus';

const SERVICE_NAME = 'br.org.cesar.knot1';
const SETTINGS_INTERFACE_NAME = 'br.org.cesar.knot1.Settings';
const SETTINGS_OBJECT_PATH = '/br/org/cesar/knot1/Settings';

function createDBusError(error) {
  return new dbus.Error(`${SERVICE_NAME}.${error.name}`, error.message);
}

class DBusSettingsServer {
  constructor(settingsApi) {
    this.settingsApi = settingsApi;
  }

  async start() {
    // Required by the dbus package to get the system bus
    process.env.DISPLAY = ':0';
    process.env.DBUS_SESSION_BUS_ADDRESS = 'unix:path=/run/dbus/system_bus_socket';

    const service = dbus.registerService('system', SERVICE_NAME);
    const object = service.createObject(SETTINGS_OBJECT_PATH);
    this.createInterface(object);
  }

  async createInterface(object) {
    const iface = object.createInterface(SETTINGS_INTERFACE_NAME);

    iface.addProperty('Ready', {
      type: dbus.Define(Boolean),
      getter: async (done) => {
        try {
          const isReady = await this.settingsApi.isReady();
          done(null, isReady);
        } catch (e) {
          const dbusErr = createDBusError(e);
          done(dbusErr);
        }
      },
    });

    iface.addProperty('Cloud', {
      type: dbus.Define(Object),
      getter: async (done) => {
        try {
          const configuration = await this.settingsApi.getCloud();
          done(null, configuration);
        } catch (e) {
          const dbusErr = createDBusError(e);
          done(dbusErr);
        }
      },
      setter: async (address, done) => {
        try {
          await this.settingsApi.configureCloud(address);
          done();
        } catch (e) {
          const dbusErr = createDBusError(e);
          done(dbusErr);
        }
      },
    });

    iface.update();
  }
}

export default DBusSettingsServer;
