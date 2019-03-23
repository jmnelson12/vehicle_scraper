import axios from "axios";
import cheerio from "cheerio";

export async function getHTML(url) {
	const { data: html } = await axios.get(url);
	return html;
}
