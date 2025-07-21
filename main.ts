import { Plugin, Notice } from "obsidian";

export default class CleanSelectedLinksPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'remove-markdown-links',
			name: 'Удалить Markdown-ссылки из выделенного текста',
			editorCallback: (editor) => {
				const selection = editor.getSelection();

				if (!selection || selection.trim() === '') {
					new Notice('Нет выделенного текста.');
					return;
				}

				// Удаляем ссылки вида: пробел (опционально) + [текст](url)
				const cleaned = selection.replace(/ ?\[[^\]]*?\]\([^\)]*?\)/g, '');

				editor.replaceSelection(cleaned);
			}
		});
	}

	onunload() {
		console.log("CleanSelectedLinksPlugin unloaded");
	}
}
