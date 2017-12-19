const dbus = require('dbus-native');

const bus = dbus.systemBus();

bus.invoke({
  path: '/org/cesar/knot/control',
  destination: 'org.cesar.knot.control',
  interface: 'org.cesar.knot.control',
  member: 'FactoryReset',
  signature: '',
  body: [],
  type: dbus.messageType.methodCall,
}, (err, res) => {
  if (err) {
    console.error(err);
  }
  console.log(res);
  process.exit();
});
