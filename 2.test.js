module("sample test");

test("viewのテスト", function(){
	setTimeout(function(){
		$("body button")[0].click();
		equal("ついか 1", $("body ul li")[0].text(), "項目がついかされておる");
	}, 1);
});
