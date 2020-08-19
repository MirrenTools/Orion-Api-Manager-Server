import marked from 'marked';

/**
 * 转换Swagger的文档为Orion可以识别的数据,如果转换失败则返回null
 * @param {Object} docs
 */
export default function(docs) {
	/**
	 * 加载转换OpenAPI
	 * @param {Object} data
	 */
	function ofOpenAPI(data) {
		var orionData = commonConvert(data);
		var servers = [];
		if (data.servers != null) {
			for (var i = 0; i < data.servers.length; i++) {
				var s = data.servers[i];
				var urls = [{
					url: s.url,
					description: s.description
				}];
				if (s.variables != null) {
					for (var key in s.variables) {
						var val = s.variables[key];
						var def = val.default;
						if (def == null) {
							continue;
						}
						var description = val.description;
						var vals = [{
							key: key,
							value: def
						}];
						if (val.enum != null) {
							for (var j = 0; j < val.enum.length; j++) {
								var va = val.enum[j];
								if (va === def) {
									continue;
								}
								vals.push({
									key: key,
									value: va
								});
							}
						}
						var ulen = urls.length;
						for (var u = 0; u < ulen; u++) {
							var url = urls[u].url;
							urls[u].url = url.replace('{' + vals[0].key + '}', vals[0].value);
							var description = urls[u].description;
							for (var e = 1; e < vals.length; e++) {
								urls.push({
									url: url.replace('{' + vals[e].key + '}', vals[e].value),
									description: description
								});
							}
						}
					}
				}
				for (var u = 0; u < urls.length; u++) {
					servers.push(urls[u]);
				}
			}
		}
		orionData.servers = servers;
		return orionData;
	}

	/**
	 * 加载转换Swagger
	 * @param {Object} data
	 */
	function ofSwagger(data) {
		var orionData = commonConvert(data);
		var servers = [];
		var nsurl = (data.host || '') + (data.basePath || '');
		if (data.schemes != null) {
			for (var i = 0; i < data.schemes.length; i++) {
				servers.push({
					url: data.schemes[i] + '://' + nsurl
				});
			}
		} else {
			if (nsurl != '') {
				servers.push({
					url: nsurl
				});
			}
		}
		orionData.servers = servers;
		return orionData;
	}
	/**
	 * 通用信息转换
	 * @param {Object} data
	 */
	function commonConvert(data) {
		var orionData = {};
		//项目信息转换开始
		if (data.info != null) {
			var info = data.info;
			if (info.title != null) {
				orionData.name = info.title;
			}
			if (info.version != null) {
				orionData.versions = info.version;
			}
			orionData.description = '';
			if (info.description != null) {
				orionData.description = marked(info.description);
			}
			if (info.termsOfService != null) {
				if (orionData.description != '') {
					orionData.description += '\n';
				}
				if (info.license != null) {
					orionData.description += '<p>';
				} else {
					orionData.description += '<div>';
				}
				orionData.description += '<a href="' + info.termsOfService + '" target="_blank">Terms of service</a>';
				if (info.license != null) {
					orionData.description += '</p>';
				} else {
					orionData.description += '</div>';
				}
			}
			if (info.license != null) {
				if (orionData.description != '') {
					orionData.description += '\n';
				}
				orionData.description += '<div><a href="' + (info.license.url || '#') + '" target="_blank">License ' + (info.license
					.name || '') + '</a></div>';
			}
			if (info.contact != null) {
				if (info.contact.name != null) {
					orionData.contactName = info.contact.name;
				}
				if (info.contact.email != null) {
					orionData.contactInfo = 'Email: <a href="mailto:' + info.contact.email + '">' + info.contact.email + '</a>';
				}
				if (info.contact.url != null) {
					if (orionData.contactInfo == null) {
						orionData.contactInfo = '';
					} else {
						orionData.contactInfo += '　';
					}
					orionData.contactInfo += 'URL: <a href="' + info.contact.url + '" target="_blank">' + info.contact.url + '</a>';
				}
			}
		}
		//项目信息转换结束
		//分组信息转换开始
		orionData.content = [];
		var groups = {};
		if (data.tags != null) {
			for (var i = 0; i < data.tags.length; i++) {
				var tag = data.tags[i];
				tag.apis = [];
				tag.summary = tag.name;
				if (tag.description != null) {
					tag.description = marked(tag.description);
				}
				if (groups[tag.name] != null) {
					if (tag.description) {
						if (groups[tag.name].description == null) {
							groups[tag.name].description = '';
						}
						groups[tag.name].description += marked(tag.description);
					}
				} else {
					groups[tag.name] = tag;
				}
			}
		}
		//分组信息转换结束
		//可引用数据加载
		//加载Reference
		var refs = {};
		if (data.definitions != null) {
			for (var refkey in data.definitions) {
				refs['#/definitions/' + refkey] = data.definitions[refkey];
			}
		}
		if (data.parameters != null) {
			for (var refkey in data.parameters) {
				refs['#/parameters/' + refkey] = data.parameters[refkey];
			}
		}
		if (data.responses != null) {
			for (var refkey in data.responses) {
				refs['#/responses/' + refkey] = data.responses[refkey];
			}
		}
		if (data.components != null && data.components.schemas != null) {
			for (var refkey in data.components.schemas) {
				refs['#/components/schemas/' + refkey] = data.components.schemas[refkey];
			}
		}
		if (data.components != null && data.components.parameters != null) {
			for (var refkey in data.components.parameters) {
				refs['#/components/parameters/' + refkey] = data.components.parameters[refkey];
			}
		}
		if (data.components != null && data.components.responses != null) {
			for (var refkey in data.components.responses) {
				refs['#/components/responses/' + refkey] = data.components.responses[refkey];
			}
		}
		if (data.components != null && data.components.requestBodies != null) {
			for (var refkey in data.components.requestBodies) {
				refs['#/components/requestBodies/' + refkey] = data.components.requestBodies[refkey];
			}
		}
		if (data.components != null && data.components.headers != null) {
			for (var refkey in data.components.headers) {
				refs['#/components/headers/' + refkey] = data.components.headers[refkey];
			}
		}
		for (var refkey in refs) {
			var nref = fillSchemaRef(refs[refkey], refs);
			refs[refkey] = nref;
		}
		//可引用数据加载结束

		// API信息转换开始
		for (var path in data.paths) {
			var ad = data.paths[path];
			for (var method in ad) {
				var api = {};
				api.path = path;
				var adata = ad[method];
				api.method = method;
				api.title = adata.summary || path;
				if (adata.description != null) {
					adata.description = marked(adata.description);
				}
				api.externalDocs = adata.externalDocs;
				api.consumes = adata.consumes;
				api.produces = adata.produces;
				api.deprecated = adata.deprecated;

				// Request转换
				api.parameters = [];

				// Response转换
				api.responses = [];
				for (var pkey in adata.responses) {
					var pdata = adata.responses[pkey];
					var resp = {
						status: pkey,
						msg: pdata.description || '',
						data: []
					};
					if (pdata.headers != null) {
						for (var hkey in pdata.headers) {
							var hdata = pdata.headers[hkey];
							if (hdata.schema != null) {
								for (var skey in hdata.schema) {
									if (hdata[skey] != null) {
										hdata[skey] = hdata.schema[skey];
									}
								}
							}
							var rdata = {};
							rdata.in = 'header';
							rdata.type = hdata.type || 'string';
							rdata.name = hkey;
							rdata.description = hdata.description || '';
							if (hdata.items != null) {
								rdata.items = hdata.items;
							}
							resp.data.push(rdata);
						}
					}
					if (pdata.content != null) {
						if (pdata.content['application/json'] != null) {
							console.log('application/json');
							console.log(pdata.content['application/json']);
						} else {
							console.log('pdata.content')
							console.log(pdata.content);
						}
					}
					api.responses.push(resp);
				}

				var tempGroup;
				if (adata.tags != null && adata.tags.length >= 1) {
					tempGroup = groups[adata.tags[0]];
				}
				if (tempGroup == null) {
					if (groups['Unnamed'] == null) {
						groups['Unnamed'] = {
							name: 'Unnamed',
							summary: 'This group has not been named',
							apis: []
						};
					}
					tempGroup = groups['Unnamed'];
				}
				tempGroup.apis.push(api);
				// console.log('api');
				// console.log(api);
			}
		}

		// API信息转换结束
		for (var key in groups) {
			orionData.content.push(groups[key]);
		}
		orionData.externalDocs = data.externalDocs;
		return orionData;
	}
	/**
	 * 填充Schema
	 * @param {Object} ref
	 * @param {Object} refs
	 */
	function fillSchemaRef(ref, refs) {
		var refStr = JSON.stringify(ref);
		var refkeys = refStr.match(/"\$ref":".*?(?=")/g);
		if (refkeys == null) {
			return JSON.parse(refStr);
		}
		for (var i = 0; i < refkeys.length; i++) {
			var key = refkeys[i].replace('"$ref":"', '');
			var obj = refs[key];
			refStr = refStr.replace('"' + key + '"', JSON.stringify(obj));
			while (refStr.indexOf(key) != -1) {
				refStr = refStr.replace('"' + key + '"', JSON.stringify(obj));
			}
		}
		return JSON.parse(refStr);
	}
	/**
	 * 将Schema(比如definitions或components.schemas中的对象或请求响应数据)转换为Orion的请求响应数据
	 * @param {Object} ref 对象
	 * @param {Object} refs 对象集合
	 */
	function convertSchema(ref, refs) {
		ref.type = this.getSwaggerSchemaDataType(ref) || 'string';
		if (ref.description != null) {
			ref.description = marked(ref.description);
		}
		if (ref.default != null) {
			ref.def = ref.default;
		}
		if (ref.enum != null) {
			ref.enums = ref.enum;
		}
		if (ref['$ref'] != null) {
			var refData = refs[ref['$ref']];
			if (refData != null) {
				if (ref.items == null) {
					ref.items = [];
				}
				ref.items.push(refData);
			}
			return;
		}
		if (ref.required != null) {
			if (ref.description == null) {
				ref.description = 'Required:';
			}
			for (var i = 0; i < ref.required.length; i++) {
				if (i == 0) {
					ref.description = 'Required:' + ref.required[i];
				} else {
					ref.description += ',' + ref.required[i];
				}
			}
		}

		if (ref.properties != null) {
			if (ref.items == null) {
				ref.items = [];
			}
			for (var rkey in ref.properties) {
				var pdata = ref.properties[rkey];
				if (pdata['$ref'] != null) {
					if (refs[pdata['$ref']] != null) {
						ref.items.push(refs[pdata['$ref']]);
					}
				} else {
					var item = {};
					item.name = rkey;
					item.type = this.getSwaggerSchemaDataType(pdata) || 'string';
					item.description = pdata.pdata || '';
					ref.items.push(item);
				}
			}
		}
		if (ref.additionalProperties != null) {
			if (ref.items == null) {
				ref.items = [];
			}
			for (var rkey in ref.additionalProperties) {
				var pdata = ref.additionalProperties[rkey];
				if (pdata['$ref'] != null) {
					if (refs[pdata['$ref']] != null) {
						ref.items.push(refs[pdata['$ref']]);
					}
				} else {
					var item = {};
					item.name = rkey;
					item.type = this.getSwaggerSchemaDataType(pdata) || 'string';
					item.description = pdata.pdata || '';
				}
			}
		}
		if (ref.items != null) {
			for (var i = 0; i < ref.items; i++) {
				this.convertSchema(ref.items[i], refs);
			}
		}
	}

	/**
	 * 获取Swagger(OpenAPI)的数据类型
	 * @param {Object} ref
	 */
	function getSwaggerSchemaDataType(ref) {
		if (ref.type != null) {
			if (ref.type == 'integer' && ref.format == 'int64') {
				return 'long';
			} else if (ref.type == 'integer') {
				return 'int';
			} else if (ref.type == 'number' && ref.format == 'float') {
				return 'float';
			} else if (ref.type == 'number' && ref.format == 'double') {
				return 'double';
			}
		}
		return ref.type;
	}

	var openapi = docs.openapi;
	var swagger = docs.swagger;
	if (openapi != null && openapi.startsWith('3.')) {
		return ofOpenAPI(docs);
	} else if (swagger != null && swagger.startsWith('2.')) {
		return ofSwagger(docs);
	} else {
		return null
	}
}
