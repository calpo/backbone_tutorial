module("sample test");

test("viewのテスト", function(){
	setTimeout(function(){
		equal("波浪ワールド", $("body ul li")[0].text(), "必ずOKになる");
	}, 1);
});
