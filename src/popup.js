document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save-title-button').addEventListener('click', function() {
        let title = document.getElementById('title').value;

        chrome.runtime.sendMessage({type: 'saveTitle', title: title});

        window.close();
    });
});
