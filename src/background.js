function updateTitleTab(tabId, title) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: function(title) {
            document.title = title;
        },
        args: [title]
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == 'saveTitle') {
        let title = request.title;

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            let url = tabs[0].url;

            chrome.storage.sync.get('savedTabs', function(data) {
                let savedTabs = data.savedTabs || {};

                savedTabs[url] = { title: title };

                chrome.storage.sync.set({'savedTabs': savedTabs}, function() {
                    console.log('title saved: ' + title, 'url: ' + url);
                });

                updateTitleTab(tabId, title);
            });
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        let url = tab.url;

        chrome.storage.sync.get('savedTabs', function(data) {
            let savedTabs = data.savedTabs || {};

            console.log(savedTabs);
            console.log(url);
            console.log(savedTabs[url]);

            if (savedTabs[url]) {
                updateTitleTab(tabId, savedTabs[url].title);
            }
        });
    }
});
