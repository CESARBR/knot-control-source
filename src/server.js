const dbus = require('dbus-native');
const factoryReset = require('./factoryReset');

const serviceName = 'org.cesar.knot.control';
const interfaceName = serviceName;
const objectPath = `/${serviceName.replace(/\./g, '/')}`;

const systemBus = dbus.systemBus();

if (!systemBus) {
  throw new Error('Could not connect to the DBus system bus.');
}

systemBus.requestName(serviceName, 0x4, (err, retCode) => {
  if (err) {
    throw new Error(`Could not request service name ${serviceName}, the error was: ${err}.`);
  }

  // Return code 0x1 means we successfully had the name
  if (retCode === 1) {
    console.log(`Successfully requested service name "${serviceName}"!`);
    const ifaceDesc = {
      name: interfaceName,
      methods: {
        FactoryReset: ['', 's', [], ['status_message']],
      },
      properties: {
        Flag: 'b',
        StringProp: 's',
      },
    };

    const iface = {
      FactoryReset: () => {
        factoryReset((errFactRst) => {
          if (errFactRst) {
            console.error(errFactRst);
          } else {
            console.log('Factory Reset Successfully');
          }
        });
        return 'Factory Reset Successfully';
      },
      Flag: true,
      StringProp: 'initial string',
    };

    // Now we need to actually export our interface on our object
    systemBus.exportInterface(iface, objectPath, ifaceDesc);

    /* Say our service is ready to receive function calls
    (you can use `gdbus call` to make function calls) */
    console.log('Interface exposed to DBus, ready to receive function calls!');
  } else {
    /* Other return codes means various errors, check here
      (https://dbus.freedesktop.org/doc/api/html/group__DBusShared.html#ga37a9bc7c6eb11d212bf8d5e5ff3b50f9) for more
      information
    */
    throw new Error(`Failed to request service name ${serviceName}.Check what return code "${retCode}" means.`);
  }
});
