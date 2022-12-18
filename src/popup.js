const main = document.getElementById('main');

const currentWindow = await chrome.windows.getCurrent();
const tabs = await chrome.tabs.query({windowId: currentWindow.id, url: '*://*/*'});

const extractTabTitleAndUrl = (tabs) => tabs.map((tab) => `[${tab.title}](${tab.url})`).join('\n');

const button = main.querySelector('button');
button.addEventListener('click', async () => {
  if (tabs.length) {
    try {
      await navigator.clipboard.writeText(extractTabTitleAndUrl(tabs));
    } catch (err) {
      console.log(err);
    }
  }
  window.close();
});
