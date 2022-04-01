<?require_once($_SERVER['DOCUMENT_ROOT']. "/bitrix/modules/main/include/prolog_before.php");
CModule::IncludeModule("iblock");
$IBLOCK_ID = 9;
$arSelect = Array("ID", "IBLOCK_ID", "PROPERTY_TYPE_MEASURE", "PROPERTY_INDUSTRY", "PROPERTY_STATUS", "PROPERTY_DESCRIPTION", "PROPERTY_ANNOUNCEMENT_DATE", "PROPERTY_VALIDITY", "PROPERTY_SUPPORT_AMOUNT", "PROPERTY_SOURCE");
$arFilter = Array("IBLOCK_ID" => $IBLOCK_ID, "ACTIVE"=>"Y");
$arSorter = Array();
$arNav = Array();
// if (isset($_POST['navParams'])){
//     $arNav = array("iNumPage" => $_POST['navParams']["pageNumber"], "nPageSize" => $_POST['navParams']["pageSize"]);
// }

if (isset($_POST['sorts']['announcementDate'])){
    if ($_POST['sorts']['announcementDate'] === "inc") {
        $arSorter = Array("PROPERTY_ANNOUNCEMENT_DATE" => "ASC");
    } else if ($_POST['sorts']['announcementDate'] === "dec") {
        $arSorter = Array("PROPERTY_ANNOUNCEMENT_DATE" => "DESC");
    }
}
if (isset($_POST['filters'])){
    $filters = $_POST['filters'];
    if (isset($filters['industry'])) {
        $arFilter[] = array("PROPERTY_INDUSTRY_VALUE" => $filters['industry']);
    } 
    if (isset($filters['typeMeasure'])) {
        $arFilter[] = array("PROPERTY_TYPE_MEASURE_VALUE" => $filters['typeMeasure']);
    } 
    if (isset($filters['status'])) {
        $arFilter[] = array("PROPERTY_STATUS_VALUE" => $filters['status']);
    } 
}
$res = CIBlockElement::GetList($arSorter, $arFilter, false, $arNav, $arSelect);
$rows = array();
while($ob = $res->GetNextElement()) {
    $arElements = $ob->GetFields();
    $rows[] = array(
        "typeMeasure" => $arElements["PROPERTY_TYPE_MEASURE_VALUE"],
        "industry" => $arElements["PROPERTY_INDUSTRY_VALUE"],
        "status" => $arElements["PROPERTY_STATUS_VALUE"],
        "description" => $arElements["PROPERTY_DESCRIPTION_VALUE"]["TEXT"],
        "announcementDate" => $arElements["PROPERTY_ANNOUNCEMENT_DATE_VALUE"],
        "validity" => $arElements["PROPERTY_VALIDITY_VALUE"],
        "supportAmount" => $arElements["PROPERTY_SUPPORT_AMOUNT_VALUE"],
        "source" => $arElements["PROPERTY_SOURCE_VALUE"]["TEXT"],
    );
}

if (isset($_POST['navParams'])){
    if ($_POST['navParams']['endIndex'] && $_POST['navParams']['endIndex'] > 0) {
        $rows = array_slice($rows, $_POST['navParams']['startIndex'], $_POST['navParams']['pageSize']);
    }
}

$typeMeasureList = array();
$industryList = array();
$status = array();

$typeMeasure = CIBlockPropertyEnum::GetList(Array(), Array("IBLOCK_ID"=>$IBLOCK_ID, "CODE"=>"TYPE_MEASURE"));
while($typeMeasureTemp = $typeMeasure->GetNext())
{
    $typeMeasureList[] = $typeMeasureTemp["VALUE"];
}
array_unshift($typeMeasureList, "");

$industry = CIBlockPropertyEnum::GetList(Array(), Array("IBLOCK_ID"=>$IBLOCK_ID, "CODE"=>"INDUSTRY"));
while($industryTemp = $industry->GetNext())
{
    $industryList[] = $industryTemp["VALUE"];
}
array_unshift($industryList, "");

$status = CIBlockPropertyEnum::GetList(Array(), Array("IBLOCK_ID"=>$IBLOCK_ID, "CODE"=>"STATUS"));
while($statusTemp = $status->GetNext())
{
    $statusList[] = $statusTemp["VALUE"];
}
array_unshift($statusList, "");

$result = [
    'isSuccess' => true,
    'length' => count($rows),
    'rows' => $rows,
    'typeMeasureList' => $typeMeasureList,
    'industryList' => $industryList,
    'statusList' => $statusList,
    'filters' => $filters
];

header("Content-type: application/json; charset=utf-8");
echo json_encode($result);