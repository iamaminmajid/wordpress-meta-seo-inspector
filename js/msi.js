jQuery(document).ready(function($){

	let msibtn = '#wp-admin-bar-msi-analyze';

	let headers = $(':header');
	let imgs = $('img');

	$('body.admin-bar').append(`<div class="msi"></div>`);

	let headersHtml = `<div class="msi-header">Headers Present:</div>`;
	for(let i = 0; i<headers.length; i++){
		headersHtml += `<div class="msi-meta-${headers[i].nodeName}">${headers[i].nodeName}: ${headers[i].innerText}</div>`;
	}

	let imgsHtml = '';
	let imgError;
	let imgNoAlt = 0;
	
	for(let i = 0; i<imgs.length; i++){
		imgsHtml += `<tr>
			<td>${imgs[i].src}</td>
			<td>${imgs[i].alt}</td>
			<td>${imgs[i].height}x${imgs[i].width}</td>
			<td>${imgs[i].loading}</td>
		</tr>`;
		if(imgs[i].alt == ''){
			imgNoAlt++;
			imgError = imgNoAlt + ' images found with no ALT attribute.'
		}
	}

	imgsHtml = `<div class="msi-header">Images Present:</div>
		<div class="msi-warning">${imgError}</div>
		<table>
			<thead>
				<th>SRC</th>
				<th>ALT</th>
				<th>SIZE</th>
				<th>LOADING</th>
			</thead>
			<tbody>${imgsHtml}</tbody>
		</table>`

	$(msibtn).on('click', function(){
		$('.msi').append(`<div class="msi-section">${headersHtml}</div>`);
		$('.msi').append(`<div class="msi-section">${imgsHtml}</div>`);
	})




})