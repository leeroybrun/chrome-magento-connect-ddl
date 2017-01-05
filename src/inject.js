chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			var directDlMsg = chrome.i18n.getMessage('directDownload');

			var latestDlUrl = false;

			jQuery('#extension-version-list-container .extension-version').each(function() {
				var jsContent = '';
				jQuery('script', this).each(function() {
					jsContent += jQuery(this).html();
				})

				var extKex20Regex = /http:\\\/\\\/connect20.magentocommerce.com\\\/community\\\/([a-zA-Z0-9_.-]+)/;
				var match = extKex20Regex.exec(jsContent);

				if(match && match[1]) {
					var vPos = match[1].indexOf('-');
					var extName = match[1].substring(0, vPos);
					var extVersion = match[1].substring(vPos+1);
					var dlUrl = 'http://connect20.magentocommerce.com/community/'+ extName +'/'+ extVersion +'/'+ extName +'-'+ extVersion +'.tgz';

					if(extName && extName.length > 0 && extVersion && extVersion.length > 0) {
						if(!latestDlUrl) {
							latestDlUrl = dlUrl;
						}

						jQuery('.get-extension-button .button-purchase', this).append('<a href="'+dlUrl+'" target="_blank" class="ui-button ui-button-blue-huge" title="'+ directDlMsg +'">'+ directDlMsg +'</a>');
					}
				}				
			});

			if(latestDlUrl) {
				jQuery('#product-view-offers-purchasing #button-purchase').append('<button type="button" class="ui-button ui-button-blue-huge" title="'+ directDlMsg +'" style="display:block;width:250px;margin-top:10px;margin-left:4px;" onclick="window.open(\''+ latestDlUrl +'\', \'_blank\');">'+ directDlMsg +'</button>');
			}
		}
	}, 10);
});
