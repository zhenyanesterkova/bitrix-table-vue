<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Приложение vue");
use denvic;
\Bitrix\Main\UI\Extension::load("ui.vue");
\Bitrix\Main\UI\Extension::load("denvic.table.table");
?>
<div id="vue">

</div>
<script>
BX.Vue.component('bx-table-root', {
    template: `
        <div class="vue-table">
            <bx-table />
        </div>
    `,
});
BX.Vue.create({
    el: '#vue',
    template: `
        <bx-table-root />
    `,
});
</script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>