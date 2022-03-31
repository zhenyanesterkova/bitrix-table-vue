<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/table.bundle.css',
	'js' => 'dist/table.bundle.js',
	'rel' => [
		'main.polyfill.core',
		'ui.vue',
		'denvic.table.loader',
		'denvic.table.filters',
		'denvic.table.sorters',
		'denvic.table.table-head',
		'denvic.table.paginators',
		'denvic.table.vue-table',
	],
	'skip_core' => true,
];