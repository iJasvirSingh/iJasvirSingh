//<![CDATA[

    $('.author-description a').each(function() {

        $(this).attr('target', '_blank');

    });

   

    $('.post-body strike').each(function() {

        var $this = $(this),

            type = $this.text();

        if (type.match('left-sidebar')) {

            $this.replaceWith('<style>.item #main-wrapper{float:right;padding:0 0 0 25px}.item #sidebar-wrapper{float:left}</style>');

        }

        if (type.match('right-sidebar')) {

            $this.replaceWith('<style>.item #main-wrapper{float:left;padding:0 25px 0 0}.item #sidebar-wrapper{float:right}</style>');

        }

        if (type.match('full-width')) {

            $this.replaceWith('<style>.item #main-wrapper{width:100%;padding:0}.item #sidebar-wrapper{display:none}#content-wrapper > .container{margin:0 auto}</style>');

        }

    });

 $('.related-ready').each(function() {

        var $this = $(this),

            label = $this.find('.related-tag').data('label');

        ajaxPosts($this, 'related', 3, label);

    });

    function post_link(feed, i) {

        for (var x = 0; x < feed[i].link.length; x++)

            if (feed[i].link[x].rel == 'alternate') {

                var link = feed[i].link[x].href;

                break

            }

        return link;

    }

    function post_title(feed, i, link) {

        var n = feed[i].title.$t,

            code = '<a href="' + link + '">' + n + '</a>';

        return code;

    }

    function post_author(feed, i) {

        var n = feed[i].author[0].name.$t,

            code = '<span class="post-author">' + n + ' </span>';

        return code;

    }

    function post_date(feed, i) {

        var c = feed[i].published.$t,

            d = c.substring(0, 4),

            f = c.substring(5, 7),

            m = c.substring(8, 10),

            h = monthFormat[parseInt(f, 10) - 1] + ' ' + m + ', ' + d,

            code = '<span class="post-date">' + h + '</span>';

        return code;

    }

  function post_label(feed, i) {

        if (feed[i].category != undefined) {

            var tag = feed[i].category[0].term,

                code = '<span class="post-tag">' + tag + '</span>';

        } else {

            code = '';

        }

        return code;

    }

    function ajaxPosts($this, type, num, label) {

        if (type.match('related')) {

            var url = '';

            if (label == 'recent') {

                url = '/feeds/posts/default?alt=json-in-script&max-results=' + num;

            } else if (label == 'random') {

                var index = Math.floor(Math.random() * num) + 1;

                url = '/feeds/posts/default?max-results=' + num + '&start-index=' + index + '&alt=json-in-script';

            } else {

                url = '/feeds/posts/default/-/' + label + '?alt=json-in-script&max-results=' + num;

            }

            $.ajax({

                url: url,

                type: 'get',

                dataType: 'jsonp',

                success: function(json) {

                    if (type.match('related')) {

                        var kode = '<ul class="related-posts">';

                    }

                    var entry = json.feed.entry;

                    if (entry != undefined) {

                        for (var i = 0, feed = entry; i < feed.length; i++) {

                            var link = post_link(feed, i),

                                title = post_title(feed, i, link),

                                image = post_image(feed, i),

                                tag = post_label(feed, i),

                                author = post_author(feed, i),

                                date = post_date(feed, i);

                            var kontent = '';

                            if (type.match('related')) {

                                kontent += '<li class="related-item item-' + i + '"><a class="post-image-link" href="' + link + '">' + image[1] + '</a><h2 class="post-title">' + title + '</h2><div class="post-meta">' + date + '</div></li>';

                            }

                            kode += kontent;

                        }

                        kode += '</ul>';

                    } else {

                        kode = '<ul class="no-posts">Error: No Posts Found <i class="fa fa-frown-o"/></ul>';

                    }

                        $this.html(kode);

                }

            });

        }

    }

$('.blog-post-comments').each(function() {

        var system = commentsSystem,

            disqus_url = disqus_blogger_current_url,

            disqus = '<div id="disqus_thread"/>',

            current_url = $(location).attr('href'),

            facebook = '<div class="fb-comments" data-width="100%" data-href="' + current_url + '" data-numposts="5"></div>',

            sClass = 'comments-system-' + system;

        if (system == 'blogger') {

            $(this).addClass(sClass).show();

        } else if (system == 'disqus') {

            (function() {

                var dsq = document.createElement('script');

                dsq.type = 'text/javascript';

                dsq.async = true;

                dsq.src = '//' + disqusShortname + '.disqus.com/embed.js';

                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

            })();

            $('#comments, #gpluscomments').remove();

            $(this).append(disqus).addClass(sClass).show();

        } else if (system == 'facebook') {

            $('#comments, #gpluscomments').remove();

            $(this).append(facebook).addClass(sClass).show();

        } else if (system == 'hide') {

            $(this).hide();

        } else {

            $(this).addClass('comments-system-default').show();

        }

    });

//]]>
