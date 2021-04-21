jQuery(document).ready(function($){

	let msibtn = '#wp-admin-bar-msi-analyze:not(.open)';
	let allErrors = 0;

	let headers = $(':header');
	let h1 = 0, h2 = 0;


	let imgs = $('img');
	let anchors = $('a');

	let schemaTag = $('script[type="application/ld+json"]');
	let schema;
	if(schemaTag.length > 0){
		schema = $.parseJSON($('script[type="application/ld+json"]').html());
	}
	$('body.admin-bar').append(`<div class="msi"></div>`);

	let headersHtml = `<div class="msi-header">Headers Present:</div>`;
	for(let i = 0; i<headers.length; i++){
		headersHtml += `<div class="msi-meta-${headers[i].nodeName}">${headers[i].nodeName}: ${headers[i].innerText}</div>`;
		if(headers[i].nodeName == 'H1'){
			h1++;
		}
		if(headers[i].nodeName == 'H2'){
			h2++;
		}
	}

	let imgsHtml = '';
	let imgError = 0;
	let imgNoAlt;
	
	for(let i = 0; i<imgs.length; i++){
		imgsHtml += `<tr>
			<td>${imgs[i].src}</td>
			<td>${imgs[i].alt}</td>
			<td>${imgs[i].height}x${imgs[i].width}</td>
			<td>${imgs[i].loading}</td>
		</tr>`;
		if(imgs[i].alt == ''){
			imgError++;
			imgNoAlt = `<div class="msi-warning">${imgError} images found with no ALT attribute.</div>`;
		}
	}

	imgsHtml = `<div class="msi-header">Images Present:</div>
		${imgNoAlt}
		<table>
			<thead>
				<th>SRC</th>
				<th>ALT</th>
				<th>SIZE</th>
				<th>LOADING</th>
			</thead>
			<tbody>${imgsHtml}</tbody>
		</table>`;


	let anchorHtml = '';
	let anchorError = 0;
	let anchorNoText;
	
	for(let i = 0; i<anchors.length; i++){
		anchorHtml += `<tr>
			<td>${anchors[i].innerText}</td>
			<td>${anchors[i].href}</td>
			<td>${anchors[i].rel}</td>
		</tr>`;
		if(anchors[i].innerText == ''){
			anchorError++;
			anchorNoText = `<div class="msi-warning">${anchorError} links found with no text value.</div>`;
		}
	}

	anchorHtml = `<div class="msi-header">Anchor Links Present:</div>
		${anchorNoText}
		<table>
			<thead>
				<th>Text</th>
				<th>Link</th>
				<th>Rel</th>
			</thead>
			<tbody>${anchorHtml}</tbody>
		</table>`;


	let overviewHtml = `<div class="msi-header">Overview:</div>
			<div class="msi-tags">&lt;a&gt; ${anchors.length}</div>
			<div class="msi-tags">&lt;img&gt; ${imgs.length}</div>`;

	let schemaHtml = '';
	let schemaError = 0;
	let schemaNo;
	if(schemaTag.length > 0){
		for(let i = 0; i<schema['@graph'].length; i++){
			schemaHtml += `<tr>
				<td>${schema['@graph'][i]['@type']}</td>
				<td>${schema['@graph'][i]['name']}</td>
				<td>${schema['@graph'][i]['@id']}</td>
			</tr>`;
			
		}

		
	}else{
		schemaNo = `<div class="msi-warning">No Schema Found</div>`;
		allErrors++;
	}
	schemaHtml = `<div class="msi-header">Schema Data:</div>
			${schemaNo}
			<table>
				<thead>
					<th>Type</th>
					<th>Name</th>
					<th>ID</th>
				</thead>
				<tbody>${schemaHtml}</tbody>
			</table>`;

	
	if(anchorError > 0){
		console.log('e');
		allErrors++;
	}
	if(imgError > 0){
		allErrors++;
	}
	if(h1 == 0 || h1 > 1){
		allErrors++;
	}
	if(h2 == 0){
		allErrors++;
	}
	if(allErrors > 0){
		$(msibtn + ' a').append(`<span>${allErrors} Issues</span>`);
	}



	$(msibtn).on('click', function(){
		$('.msi').innerHtml = ' ';
		$('.msi').show();
		$('.msi').append(`<div class="msi-section">${schemaHtml}</div>`);
		//$('.msi').append(`<div class="msi-section">${overviewHtml}</div>`);
		$('.msi').append(`<div class="msi-section">${headersHtml}</div>`);
		$('.msi').append(`<div class="msi-section">${imgsHtml}</div>`);
		$('.msi').append(`<div class="msi-section">${anchorHtml}</div>`);
	})

})