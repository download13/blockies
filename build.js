var http = require('http');
var qs = require('querystring');
var fs = require('fs');

function build(inFile, outFile) {
	console.log('Reading ' + inFile);
	var inFileContents = fs.readFileSync(inFile, {encoding: 'utf8'});
	console.log('Read ' + inFileContents.length + ' bytes');

	console.log('Compressing...');
	compress(inFileContents, function(err, code) {
		if(err) throw err;

		var percent = Math.floor((code.length / inFileContents.length) * 100);
		console.log('Compressed ' + inFileContents.length + ' to ' +
			code.length + ' bytes (' + percent + '%)');
		console.log('Writing ' + outFile);
		fs.writeFileSync(outFile, code);
	});
}

function compress(code, cb) {
	cb = once(cb);

	var code; // TODO
	var params = {
		output_format: 'json',
		output_info: 'compiled_code',
		compilation_level: 'SIMPLE_OPTIMIZATIONS',
		warning_level: 'verbose',
		output_file_name: 'default.js',
		js_code: code
	};
	var req = http.request({
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		hostname: 'closure-compiler.appspot.com',
		path: '/compile'
	}, function(res) {
		res.setEncoding('utf8');
		var body = '';
		res.on('readable', function() {
			body += res.read();
		}).on('end', function() {
			try {
				var code = JSON.parse(body).compiledCode;
				cb(null, code);
			} catch(e) {
				cb(e);
			}
		}).on('error', cb);
	});
	req.end(qs.stringify(params));
	req.on('error', cb);
}

function once(fn) {
	var f = function() {
		if(f.called) return;
		f.called = true;
		return fn.apply(this, arguments);
	}
	return f;
}


build('blockies.js', 'blockies.min.js');
