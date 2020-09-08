const serialport = require('serialport')
// import serialport from '@serialport';
const tableify = require('tableify')

// serialport.list((err, ports) => {
//   console.log('ports', ports);
//   if (err) {
//     document.getElementById('error').textContent = err.message
//     return
//   } else {
//     document.getElementById('error').textContent = ''
//   }

//   if (ports.length === 0) {
//     document.getElementById('error').textContent = 'No ports discovered'
//   }

//   tableHTML = tableify(ports)
//   document.getElementById('ports').innerHTML = tableHTML
// })