setTimeout(function() {
    $(function() {
        var e;
        t = document.URL;
        l = t.split("/");
        i = "b" == l[4] ? "v" + l[5] : l[4] + l[5];
        window.n = $("#player");
        $.ajax({
            url: "https://api.twitch.tv/api/viewer/token.json?as3=t",
            dataType: "jsonp",
            success: function(t) {
                e = t.token, $.ajax({
                    url: "http://api.twitch.tv/api/videos/" + i + "?as3=t&oauth_token=" + e,
                    dataType: "jsonp",
                    success: function(e) {
                        var t, l = e.start_offset,
                            i = e.end_offset,
                            o = [],
                            a = 0;
                        if (void 0 !== e.chunks["medium"]) {
                            console.log("480p detected!"), $("body").append('<script src="http://releases.flowplayer.org/js/flowplayer-3.2.13.min.js"><\/script><style>#player{margin-bottom:45px;}#fixplayer{height:100%;}#playlist{display:block;width:100%;overflow:auto;padding-bottom:15px;height:25px;text-align:left;}#playlist .container{width:100%;min-width:100%;display:table;padding:0px;color:#fff}#playlist .clip{white-space: nowrap;text-align:center;display: table-cell;height:25px;padding:0px 8px;border-right: 2px solid #3A285D;line-height:25px;background-color:#6441A5;cursor:pointer;}#playlist .clip:hover{background-color:#7550BA;}</style>'), n[0].style.marginBottom = "30px", n.children().remove(), n.append('<div id="fixplayer"></div><ul id="playlist"><div class="container"></div></ul>');
                            console.log(e.chunks);
                            for (var r = 0; r < e.chunks["medium"].length; r++)
                                if (t = e.chunks["medium"][r], a += t.length, a > l && a - t.length < i)
                                    if (0 == o.length) {
                                        var p = t.length - (a - l);
                                        o.push({
                                            url: t.url,
                                            duration: t.length,
                                            autoPlay: !0,
                                            autoBuffering: !0,
                                            provider: "nginx",
                                            onStart: function() {
                                                setTimeout(function() {
                                                    $f("fixplayer").seek(p)
                                                }, 1e3)
                                            }
                                        })
                                    } else o.push(i - a < t.length ? {
                                        url: t.url,
                                        duration: t.length,
                                        autoPlay: !0,
                                        autoBuffering: !0,
                                        provider: "nginx",
                                        onCuepoint: [1e3 * (i - (a - t.length)), function() {
                                            this.getPlugin("content").setHtml("The original video ended here."), this.getPlugin("content").css({
                                                display: "block"
                                            })
                                        }]
                                    } : {
                                        url: t.url,
                                        duration: t.length,
                                        autoPlay: !0,
                                        autoBuffering: !0,
                                        provider: "nginx"
                                    });
                            window.setTimeout(function() {
                                $f("fixplayer", "http://releases.flowplayer.org/swf/flowplayer-3.2.18.swf", {
                                    playlist: o,
                                    plugins: {
                                        nginx: {
                                            url: "http://releases.flowplayer.org/flowplayer.pseudostreaming/flowplayer.pseudostreaming-3.2.13.swf"
                                        },
                                        content: {
                                            url: "http://releases.flowplayer.org/flowplayer.content/flowplayer.content-3.2.9.swf",
                                            background: "#000",
                                            display: "none",
                                            bottom: 30,
                                            width: 190,
                                            height: 30,
                                            border: 0,
                                            html: "<p>The original video ended here.</p>",
                                            onClick: function() {
                                                this.hide()
                                            }
                                        }
                                    }
                                });
                                var e = $f("fixplayer").getPlaylist();
                                $.each(e, function(e, t) {
                                    $("#playlist .container").append('<li class="clip" onClick="$f(\'fixplayer\').play(' + t.index + ');">clip ' + (t.index + 1) + "</li>")
                                })
                            }, 2e3)
                        } else console.log("480p not detected! exiting.")
                    }
                })
            },
            error: function(e, t, l) {
                console.log(l)
            }
        })
    });
}, 5000);
