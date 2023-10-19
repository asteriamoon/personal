// Get the URL from the clipboard
let url = Pasteboard.paste();

// Create a unique filename based on the current timestamp
let timestamp = Date.now();
let filename = `download_file_${timestamp}`;

// Create a download task for the URL
let task = URLSession.shared().downloadTaskWithURL(NSURL.URLWithString(url), (location, response, error) => {
  if (!error) {
    let destinationURL = FileManager.iCloud().temporaryDirectory.URLByAppendingPathComponent(`${filename}.ext`);
    do {
      try FileManager.iCloud().copyItemAtURL(location, toURL: destinationURL);
      console.log(`File downloaded successfully: ${destinationURL}`);
    } catch (error) {
      console.log(`File download failed: ${error}`);
    }
  } else {
    console.log(`Error downloading file: ${error.localizedDescription}`);
  }
});

// Start the download task
task.resume();
