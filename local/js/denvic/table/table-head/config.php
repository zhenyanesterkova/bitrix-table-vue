<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/table-head.bundle.css',
	'js' => 'dist/table-head.bundle.js',
	'rel' => [
		'main.polyfill.core',
		'ui.vue',
	],
	'skip_core' => true,
];