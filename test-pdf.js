const pdf = require('pdf-parse');
console.log('PDFParse type:', typeof pdf.PDFParse);
console.log('PDFParse string:', pdf.PDFParse.toString());
// try to see if it has static methods
console.log('Static keys:', Object.keys(pdf.PDFParse));
