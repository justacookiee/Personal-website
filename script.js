// 1. GitHub API URL
const API_URL =
	"https://api.github.com/repos/justacookiee/Personal-website/contents/pages/markdown";

// 2. Variable that will hold the API objects
window.pages = [];

// 3. Fetch the list of files
fetch(API_URL)
	.then(response => response.json())
	.then(data => {
		window.pages = data;        // ✅ feed into JS variable
		document.dispatchEvent(new Event("fileListLoaded"));
		renderFileList(window.pages);
	})
	.catch(err => {
		console.error("Failed to fetch page list", err);
	});
// 4. Render file list
function renderFileList(files) {
	const container = document.getElementById("files");
	container.innerHTML = "";

	files
		.filter(f => f.type === "file")
		.forEach(file => {
			const btn = document.createElement("button");
			btn.textContent = file.name;
			btn.onclick = () => { 
				loadFile(file.download_url);
				const heading = document.getElementById("heading");
				heading.textContent = file.name;
			}
			container.appendChild(btn);
		});
}
//file.name, file.download_url
// 5. Fetch and render a selected file
function loadFile(url) {
	fetch(url)
		.then(response => response.text())
		.then(html => {
			document.getElementById("content").innerHTML = marked.parse(html);
		})
		.catch(err => {
			console.error("Failed to load file", err);
		});
}

			const filelist = document.getElementById('filelist');
			console.log(window.pages)
			document.addEventListener('fileListLoaded', () => {
				window.pages
					.filter(f => f.type == 'file')
					.forEach(file => {
						addOption(file.name);
					});
			});
			function addOption(temp) {
				filelist.appendChild(new Option(temp, temp, false, false));
			}
