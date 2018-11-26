/**
* host: http://localhost:8080,
* path: /api/v1/user/{id},
* pathVar: {id: 1},
* headers: {auth: 'bear token'},
* query: {userName: 'test'},
* method: 'GET',
* body: {a:1}
*/

function http(host, path, pathVar, headers, query, method, body, success, fail){
	var url = host + path;
	// 替换path里面的变量
	for (let i in pathVar){
		url = url.replace(`{${i}}`, pathVar[i]);
	}
	// 拼接query
	let queryArr = [];
	for (let i in query){
		queryArr.push(`${i}=${query[i]}`);
	}
	url = /\?/.test(url)?url+'&'+queryArr.join('&'): url+'?'+queryArr.join('&')
	fetch(url, {
		method,
		headers: Object.assign({'content-type': 'application/json'}, headers),
		body: JSON.stringify(body)
	}).then(res=>res.json())
	.then(body=>success(body))
	.catch(err=>fail(err))
}


// 测试
http('http://123.206.55.50:11111', '/user/login', {}, {'X-Token': 'bear token'}, {userName: 'test'}, 'POST', {username:'chenmanjie',password:'4bc4ca0bffe3f12b0a71369a8b0bcb79'}, res=>{
	console.log('请求成功...', res)
}, err=>{
	console.log('请求失败...', err)
})


function submit(){
	console.log('我第一更改');
	console.log('我第二次的更改');
}
submit()