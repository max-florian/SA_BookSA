let urls = [];
urls['g0'] = [];
urls['g0']['host'] = 'http://35.222.176.39';
urls['g0']['register'] = {
	'method': 'POST',
	'path': '/api/authentication/register'
}
urls['g0']['login'] = {
	'method': 'POST',
	'path': '/api/authentication/login'
}
urls['g0']['getBooks'] = {
	'method': 'GET',
	'path': '/api/catalogos/catalogos/catalogo'
}
urls['g0']['addBooks'] = {
	'method': 'POST',
	'path': '/api/addbooks/add_book'
}
//#########################################################################
urls['g2'] = [];
urls['g2']['host'] = 'http://3.15.230.185';
urls['g2']['login'] = {
	'method': 'POST',
	'path': '/login/login',
	'port': 3000
}
urls['g2']['register'] = {
	'method': 'POST',
	'path': '/cliente/cliente',
	'port': 3000
}
urls['g2']['getBooks'] = {
	'method': 'GET',
	'path': '/libros/libros',
	'port': 3000
}
urls['g2']['addBooks'] = {
	'method': 'POST',
	'path': '/libros/libros',
	'port': 3000
}
//#########################################################################
urls['g3'] = [];
urls['g3']['host'] = 'http://34.69.133.221';
urls['g3']['register'] = {
	'method': 'POST',
	'path': '/registro',
	'port': 47001
}
urls['g3']['login'] = {
	'method': 'POST',
	'path': '/login',
	'port': 47001
}
urls['g3']['getBooks'] = {
	'method': 'GET',
	'path': '/book/getBooks',
	'port': 47005
}
urls['g3']['addBooks'] = {
	'method': 'GET',
	'path': '/book/addBook',
	'port': 47002
}

function getUrl(group, url, urlParams = null) {
	let key = 'g'+group;

	if (key == 'g0' ) {
		return urls[key]['host'] + urls[key][url].path;
	}

	return urls[key]['host']  + ":" + urls[key][url].port + urls[key][url].path;
}

function getMethod(group, url) {
	return urls['g'+group][url].method;
}

function getHost(group) {
	return urls['g'+group]['host']
}

module.exports = { 
	getUrl, getMethod, urls, getHost
};