for(var backgroundPage=chrome.extension.getBackgroundPage(),imports=["require","isWhitelisted","extractHostFromURL","refreshIconAndContextMenu"],i=0;i<imports.length;i++)window[imports[i]]=backgroundPage[imports[i]];var require=backgroundPage.require,getStats=require("stats").getStats,FilterNotifier=require("filterNotifier").FilterNotifier,Filter=require("filterClasses").Filter,FilterStorage=require("filterStorage").FilterStorage,Prefs=require("prefs").Prefs,Cscript=require("cscript").Cscript;with(require("subscriptionClasses"))this.Subscription=Subscription,this.DownloadableSubscription=DownloadableSubscription;$(function(){function e(){chrome.tabs.query({active:!0,windowId:chrome.windows.WINDOW_ID_CURRENT},function(e){e.length>0&&(d=e[0].id,i(),FilterNotifier.addListener(t))}),window.addEventListener("unload",function(){FilterNotifier.removeListener(t)},!1)}function i(){var e=getStats("blocked",d).toLocaleString();$(".current-block-ad").html(e);var i=getStats("blocked").toLocaleString();$(".total-block-ad").html(i)}function t(e,t){"filter.hitCount"==e&&i()}function o(){chrome.windows.getCurrent(function(e){chrome.tabs.getSelected(e.id,function(e){h=e,isWhitelisted(h.url)||($("#enable-block").addClass("checked"),$("#enable-block-text").show(),$("#disable-block-text").hide()),chrome.tabs.sendMessage(h.id,{reqtype:"get-clickhide-state"},function(e){e.active&&($(".main-menu").hide(0),$(".click-block").show(0))})})});var e=Cscript.getScript("http://sub.adtchrome.com/videoadjs.txt");void 0!=e&&e.enabled&&($(".block-video-icon").toggleClass("checked"),$("#enable-video-block-text").toggle(),$("#disable-video-block-text").toggle())}function c(e){if(e)for(var i=isWhitelisted(h.url);i;)FilterStorage.removeFilter(i),i.subscriptions.length&&(i.disabled=!0),i=isWhitelisted(h.url);else{var t=extractHostFromURL(h.url).replace(/^www\./,""),i=Filter.fromText("@@||"+t+"^$document");i.subscriptions.length&&i.disabled?i.disabled=!1:(i.disabled=!1,FilterStorage.addFilter(i))}refreshIconAndContextMenu(h)}function n(e){Cscript.enable("http://sub.adtchrome.com/videoadjs.txt",e)}function r(){chrome.tabs.sendMessage(h.id,{reqtype:"clickhide-activate"}),$("body").bind("mouseleave",function(){window.setTimeout(window.close,500)})}function l(){$("body").unbind("mouseleave"),chrome.tabs.sendMessage(h.id,{reqtype:"clickhide-deactivate"})}function s(e){var i,t="",o="广告终结者(Ad Terminator)——功能最全面的广告屏蔽扩展",c="http://www.adtchrome.com/img/download-slide2.jpg",n=encodeURIComponent("http://www.adtchrome.com");switch(e){case"sina-weibo":i="http://service.weibo.com/share/share.php?url="+n+"&appkey="+t+"&title="+o+"&pic="+c;break;case"qq-zone":i="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+n+"&desc=广告终结者(Ad Terminator)——功能最全面的广告屏蔽插件&title=广告终结者(Ad Terminator)&pic="+c;break;case"tenc-weibo":i="http://share.v.t.qq.com/index.php?c=share&a=index&url="+n+"&title="+o+"&appkey="+t+"&pic="+c;break;case"renren":var r="广告终结者可以清除所有网页广告，恶意弹窗，视频广告，跟踪代码，加快网页加载速度 ",l="广告终结者(Ad Terminator)——功能最全面的广告屏蔽插件";i="http://widget.renren.com/dialog/share?resourceUrl="+n+"&message="+l+"&description="+r+"&pic="+c}window.open(i)}function a(){$(".header").click(function(){$("#ad-statistic").show(),$("#menu").hide()}),$(".footer").click(function(){$("#ad-statistic").hide(),$("#menu").show()}),$(".checkbox-hoverhook").click(function(){$(this).find(".checkbox-green").toggleClass("checked"),$("#enable-block-text").toggle(),$("#disable-block-text").toggle(),c($(this).find(".checkbox-green").hasClass("checked"))}),$(".click-block-video-hook").click(function(){$(this).find(".block-video-icon").toggleClass("checked"),$("#enable-video-block-text").toggle(),$("#disable-video-block-text").toggle(),n($(this).find(".block-video-icon").hasClass("checked"))}),$(".checkbox-hoverhook").hover(function(){$(this).find(".checkbox-green").addClass("hover")},function(){$(this).find(".checkbox-green").removeClass("hover")}),$(".option-hook").click(function(){window.close(),chrome.tabs.create({url:"options.html"})}),$(".click-help-hook").click(function(){window.open("http://www.adtchrome.com/help/index.html")}),$("#help-block").click(function(){window.open("http://www.adtchrome.com/help/help-block.html")}),$(".click-block-hook").click(function(){$(".main-menu").hide(),$(".click-block").show(),r()}),$("#click-block-cancel").click(function(){l(),$(".main-menu").show(),$(".click-block").hide()}),$(".sina-weibo").click(function(){s("sina-weibo")}),$(".qq-zone").click(function(){s("qq-zone")}),$(".tenc-weibo").click(function(){s("tenc-weibo")}),$(".renren").click(function(){s("renren")})}var d,h=null;o(),e(),a()});