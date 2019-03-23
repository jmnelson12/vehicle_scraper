const express = require('express');
const cheerio = require('cheerio');

export async function getHTML(url) {
	const { data: html } = await axios.get(url);
	return html;
}
