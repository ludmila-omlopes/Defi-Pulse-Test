jQuery(document).ready(function ($) {
    "use strict";

    /* Content Post Gallery */
    $(".post-content-gallery.justify").each( function() {
        $(this).justifiedGallery({
            selector: 'div, div:not(.spinner)',
            rowHeight: $(this).attr('data-justify'),
            maxRowHeight: parseInt( $(this).attr('data-justify') ) * 0.7,
            margins: 10
        });
    });

    $('.post-content-gallery.slider .post-gallery-list').slick({
        fade: true,
        swipe: true,
        dots: false,
        arrows: true,
        cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="icon icon-arrow-left-circle"></i></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="icon icon-arrow-right-circle"></i></button>'
    });
    $('.post-content-gallery.slider .post-gallery-list').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(this).parents('.post-content-gallery.slider').find('.post-gallery-pagination').text(i + '/' + slick.slideCount);
    });


    /* Mobile Navigation Render */
    if( $('.primary-desktop .sh-header-top .sh-nav').length ) {
        $('.primary-mobile .sh-nav-mobile').html( $('.primary-desktop #header-navigation .sh-nav').html() + $('.primary-desktop .sh-header-top .sh-nav').html() );
    } else {
        $('.primary-mobile .sh-nav-mobile').html( $('.primary-desktop #header-navigation .sh-nav').html() );
    }
    $('.primary-mobile .sh-nav-mobile > li.menu-item-has-mega-menu').each( function() {

        if( $(this).find('.mega-menu-dynamic-elements').length ) {
            var menu_items = '';
            if( $(this).find('.nav-tabs-header-categories a').length ) {
                menu_items = '<ul class="sub-menu">';
                $(this).find('.nav-tabs-header-categories a').each( function() {
                    menu_items += '<li class="menu-item"><a href="' + $(this).attr('href') + '">' + $(this).html() + '</a></li>';
                });
                menu_items += '</ul>';
            } else {
                if( $(this).find('.header-dynamic-categories').attr('data-cat') && $(this).find('.header-dynamic-categories').attr('data-cat-link') ) {
                    menu_items += '<ul class="sub-menu"><li class="menu-item"><a href="' + $(this).find('.header-dynamic-categories').attr('data-cat-link') + '">' + $(this).find('.header-dynamic-categories').attr('data-cat') + '</a></li></ul>';
                }

            }

            $(this).append( menu_items );
            $(this).find('.mega-menu-dynamic-elements').remove();
        }

    });
    //$('.primary-mobile .sh-nav-mobile').find('.mega-menu-row').remove();


    /* Header Post Render */
    $('.post-item.post-header-item').each(function(){
        var background_image = '';
        if( $(this).attr('data-i') ) {
            background_image =  '<div class="post-thumbnail">' +
                '<div class="sh-ratio">' +
                    '<div class="sh-ratio-container">' +
                        '<div class="sh-ratio-content" data-lazy-background="'+ $(this).attr('data-i') +'"></div>' +
                    '</div>' +
                '</div>' +
                '<a href="'+ $(this).attr('data-l') +'" class="post-overlay">' +
                    '<div class="post-overlay-content">' +
                        '<span></span>' +
                        '<span></span>' +
                        '<span></span>' +
                    '</div>' +
                '</a>' +
            '</div>';
        }

        $(this).html('<div class="post-container">' + background_image +
            '<div class="post-content-container">' +
                '<a href="'+ $(this).attr('data-l') +'" class="post-title">' +
                    '<h4>'+ $(this).attr('data-t') +'</h4>' +
                '</a>' +
                '<div class="post-meta">' +
                    '<div class="post-meta-content">' +
                        '<span class="post-auhor-date">' +
                            '<a href="'+ $(this).attr('data-l') +'" class="post-date">' +
                                '<i class="icon icon-clock"></i> '+ $(this).attr('data-d') +
                            '</a>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>');

        $(this).removeAttr('data-i').removeAttr('data-t').removeAttr('data-l').removeAttr('data-d');
    });


    /* Header Post Categories */
    $('.nav-tabs-header-categories a').on( "click", function() {
        window.location = $(this).attr( 'href' );
    });

    /* */
    $('.post-overlay').html( '<div class="post-overlay-content"><span></span> <span></span> <span></span></div>' );

    $(document).off('click.bs.tab.data-api', '[data-hover="tab"]');
    $(document).on('mouseenter.bs.tab.data-api', '[data-hover="tab"]', function () {
        $(this).tab('show');
    });

    if( $('.tab-pagination').length > 0 ) {
        $('.tab-pagination .tab-pagination-back').on( 'click', function(){
            var tab_current_item = $(this).parents('.tab-pane').find('.nav-tabs > .active');
            tab_current_item.prev('li').find('a').trigger('click');

            var tab_current_item_new = $(this).parents('.tab-pane').find('.nav-tabs > .active');
            if( tab_current_item_new.prev('li').length > 0 ) {
                $(this).removeClass('disabled');
            } else {
                $(this).addClass('disabled');
            }

            if( tab_current_item_new.next('li').length > 0 ) {
                $(this).parent().find('.tab-pagination-next').removeClass('disabled');
            } else {
                $(this).parent().find('.tab-pagination-next').addClass('disabled');
            }
        });

        $('.tab-pagination .tab-pagination-next').on( 'click', function(){
            var tab_current_item = $(this).parents('.tab-pane').find('.nav-tabs > .active');
            tab_current_item.next('li').find('a').trigger('click');

            var tab_current_item_new = $(this).parents('.tab-pane').find('.nav-tabs > .active');
            if( tab_current_item_new.next('li').length > 0 ) {
                $(this).removeClass('disabled');
            } else {
                $(this).addClass('disabled');
            }

            if( tab_current_item_new.prev('li').length > 0 ) {
                $(this).parent().find('.tab-pagination-back').removeClass('disabled');
            } else {
                $(this).parent().find('.tab-pagination-back').addClass('disabled');
            }
        });

        $('.tab-pagination .tab-pagination-back').trigger('click');
    }






    /* Mobile Header Dropdown (close if needed) */
    setTimeout(function(){
        if( $(document).width() < 1025 ) {
            $('.primary-desktop .sh-nav ul.sub-menu').css('display', 'none');
        }
    }, 50);
    function gillion_header_dropdown() {
        if ($(document).width() > 1025) {
            $('.sh-header-mobile-dropdown').hide();
            $('.sh-nav-dropdown').removeClass('open');
        }

        if ($(document).width() < 1025) {
            $('body').removeClass('page-layout-right-fixed');
            $('.primary-desktop ul.sub-menu').css('display', 'none');
            $('.sh-sticky-mobile-header .sh-header-mobile-dropdown').css( 'overflow', 'auto' );
            if( $('#wpadminbar').length ) {
                $('.sh-sticky-mobile-header .sh-header-mobile-dropdown').css( 'max-height',  $(window).height() - $('.sh-header-mobile-navigation').height() - $('#wpadminbar').height() );
            } else {
                $('.sh-sticky-mobile-header .sh-header-mobile-dropdown').css( 'max-height',  $(window).height() - $('.sh-header-mobile-navigation').height() );
            }
        }
    }
    gillion_header_dropdown();


    /* Header Navigation Position FIX */
    function gillion_navigation_position() {
        var new_position, menu_status, menu_width, menu_offset, window_width;
        window_width = $(document).width();
        $('ul.sh-nav ul').mouseover(function() {

            menu_status = $(this).find('.sub-menu').length;
            if( menu_status > 0 ) {

                menu_width = $(this).find('.sub-menu').width();
                menu_offset = $(this).find('.sub-menu').parent().offset().left + menu_width;
                if( (menu_offset + menu_width) > window_width ) {

                    new_position = menu_width + 0;
                    $(this).find('.sub-menu').css({
                        left: -new_position-0,
                        top: '0',
                    });

                } else {

                    $(this).find('.sub-menu').css({
                        left: new_position+0,
                        top: '0',
                    });

                }

            }
        });
    }
    gillion_navigation_position();


    /* Mega Menu Helper */
    function gillion_megamenu() {
        $('.sh-nav .mega-menu-row').each(function(){
            $(this).children().css('height','');
            var self = $(this);
            var count = parseInt( $(this).children().length );
            if( count > 0 && count <= 4 ) {
                $(this).addClass( 'mega-menu-row-'+count );

                var maxHeight = $(self).actual( 'height' );
                $(this).find('>:nth-child(-n+'+count+')').each(function() {
                    $(this).height( maxHeight );
                });
            } else {
                $(this).addClass( 'mega-menu-row-5' );

                var count_now = 0;
                while( count >= count_now ) {
                    count_now += 4;

                    var maxHeight = -1;
                    $(this).find('>:nth-child(n+'+(count_now-3)+'):nth-child(-n+'+count_now+')').each(function() {
                        maxHeight = maxHeight > $(this).actual( 'height' ) ? maxHeight : $(this).actual( 'height' );
                    });

                    $(this).find('>:nth-child(n+'+(count_now-3)+'):nth-child(-n+'+count_now+')').each(function() {
                        $(this).height(maxHeight);
                    });
                }
            }
        });
    }
    gillion_megamenu();


    /* Resize Action (slow) */
    $(window).resize(function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function(){

            gillion_header_dropdown();
            gillion_navigation_position();
            gillion_megamenu();

        }, 500);
    });


    /* Header Height Load */
    var primary_desktop = $('.sh-header-middle').actual( 'outerHeight') + $('.sh-header').actual( 'outerHeight') + $('.sh-header-top').actual( 'outerHeight');
    $('header.primary-desktop').css('height', primary_desktop );
    $('header.primary-mobile').css('height', $('.sh-header-mobile-navigation').actual( 'height' ) );
    var primary_desktop = ''
    $(window).on( 'load resize', function() {
        if( $(document).width() > 1000 ) {
            $('header.primary-desktop').css('height','');
            primary_desktop = $('.sh-header-middle').actual( 'outerHeight') + $('.sh-header').actual( 'outerHeight') + $('.sh-header-top').actual( 'outerHeight');
            $('header.primary-desktop').css('height', primary_desktop );

            $('.header-dynamic-categories-side, .header-dynamic-categories-content').css('height', '' );
            $('.header-dynamic-categories').each( function() {
                $(this).find('.header-dynamic-categories-side, .header-dynamic-categories-content').css('height', $(this).actual( 'outerHeight') );
            });
        }
    });




    /* Mobile Header Dropdown Folders */
    $('.sh-header-mobile-dropdown ul li:has(">ul") a').on( 'click', function() {
        $(this).parent().toggleClass('open');
        $(this).parent().find('> ul').stop(true, true).slideToggle(300, 'easeOutQuint');
        if( $(this).parent().hasClass('open') ) {
            $(this).parent().find('ul ul').stop(true, true).slideUp(0, 'easeOutQuint');
        }

        if( $(this).parent().hasClass('menu-item-has-children') ) {
            return false;
        }
    });
    $('html').click(function() {
        if ($('.sh-header-mobile-dropdown').is(':visible')) {
            $('.sh-nav-dropdown .c-hamburger').trigger('click').toggleClass('is-active');
        }
    });
    $('.sh-header-mobile-dropdown').click(function(event){
        event.stopPropagation();
    });


    /* Close mobile dropdown on click */
    $('.sh-header-mobile-dropdown li.menu-item:not(.menu-item-has-children)').on( 'click', function() {
        if( $(this).find('> a').attr('href').indexOf("#") >= 0 ) {
            $('.sh-header-mobile .sh-nav-dropdown').trigger('click');
        }
    });


    /* Blog Masonry Layout */
    $('.blog-style-masonry:not(.sh-recent-posts-list-carousel), .post-content-gallery.masonry').each( function() {
        var $masonry = $(this).isotope({
            itemSelector: '.post-item, .post-content-gallery-item',
            columnWidth: 0,
            gutter: 0,
        }).isotope('reloadItems');
        $masonry.imagesLoaded( function() {
            $masonry.isotope('layout').css( 'opacity', 1 );
        });
        $(window).load(function (){
            setTimeout(function(){
                $masonry.isotope('layout');
            }, 0);
        });
    });



    /* Sidebar Widgets Masonry */
    if( $(document).width() <= 1025 && $(document).width() > 700 ) {
        var $masonry = $('.sidebar-container, .gillion-columns-sidebar .wpb_widgetised_column > .wpb_wrapper').isotope({
            itemSelector: '.widget-item',
            columnWidth: 0,
            gutter: 0,
        }).isotope('reloadItems');
        $masonry.imagesLoaded( function() {
            $masonry.isotope('layout').css( 'opacity', 1 );
        });
        $(window).load(function (){
            setTimeout(function(){
                $masonry.isotope('layout');
            }, 0);
        });
    }


    /* Header Sticky */
    function gillion_sticky(){
        if ($(document).width() > 1025) {

            if( header_height < 0 ) {
                header_height = $('.sh-header').actual( 'height' );
            }

            if( header_offset_total < 0 ) {
                if( $('#wpadminbar').length ) {
                    var header_admin = $('#wpadminbar').actual( 'height' );
                } else {
                    var header_admin = 0;
                }

                if( $('.sh-header').length ) {
                    var header_offset = $('.sh-header').offset().top - header_admin;
                } else {
                    var header_offset = 0;
                }
                header_offset_total = header_offset;
            }

            if($(document).scrollTop() > header_offset_total ){
                if( !$('body').hasClass('compose-mode') ) {
                    $('.sh-header').addClass('sh-sticky-header-active').css('top', $('#wpadminbar').actual( 'height' ));
                } else {
                    $('.sh-header').addClass('sh-sticky-header-active');
                }
            } else {
                if( primary_desktop > 0 ) {
                    $('.sh-header-height').css( 'height', primary_desktop );
                    $('.sh-header:not(.sh-header-2):not(.sh-header-3):not(.sh-header-4)').css( 'height', primary_desktop );

                    setTimeout(function(){
                        $('.sh-header-height').css( 'height', '' );
                        $('.sh-header:not(.sh-header-2):not(.sh-header-3):not(.sh-header-4)').css( 'height', '' );
                    }, 300);
                }

                $('.sh-header').removeClass('sh-sticky-header-active').css('top', 0);
            }
        }

        if( $('.sh-sticky-mobile-header').length ) {
            if($(document).scrollTop() > 0 ){
                $('.sh-header-mobile').addClass('sh-sticky-mobile-header-active');
            } else {
                $('.sh-header-mobile').removeClass('sh-sticky-mobile-header-active');
            }
        }
    }
    if( $('.sh-sticky-header').length ) {

        if( $('#wpadminbar').length ) {
            var header_admin = $('#wpadminbar').height();
        } else {
            var header_admin = 0;
        }

        if( $('.sh-header').length ) {
            var header_offset = $('.sh-header').offset().top - header_admin;
        } else {
            var header_offset = 0;
        }

        var header_height = $('.sh-header').height();
        var header_offset_total = header_offset;
        var header_offset_sticky = 0;

        gillion_sticky();
        $(window).scroll(gillion_sticky);
    }


    /*  Footer Copyrights */
    if( $('.sh-copyrights-image').height() > 0 ) {
        $('.sh-copyrights-text, .sh-copyrights-social').css('line-height', $('.sh-copyrights-image').height()+'px');
    }


    /* Sidebar Search  */
    $('.sh-sidebar-search').blur( function() {
        $(this).parent().parent().parent().removeClass("sh-sidebar-search-active");
    })
    .focus( function() {
        $(this).parent().parent().parent().addClass("sh-sidebar-search-active");
    });


    /* Quantity buttons */
    function sh_increase_number_update() {
        if( $('body').hasClass('woocommerce-cart') ) {
            $('button[name="update_cart"]').removeAttr('disabled');
        }
    }

    $('.quantity').each( function() {
        if( $(this).children().is( 'input' ) ) {

            $(this).children().attr( 'type', 'text' );
            $(this).children().attr( 'class', 'sh-quantity-number' );
            $(this).prepend( '<span class="sh-noselect sh-increase-number-down">-</span>' );
            $(this).append( '<span class="sh-noselect sh-increase-number-up">+</span>' );
            $(this).addClass( 'sh-increase-numbers' );

        }
    });

    $("input.sh-quantity-number").on('keyup keypress blur change', function(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }else{
            if( $(this).val().length >= parseInt($(this).attr('maxlength')) && (e.which != 8 && e.which != 0)){
                return false;
            }
        }
    });

    $('body').on( 'updated_cart_totals', function(){
        if( $('.woocommerce .sh-alert-error').length > 1 ) {
            $('.woocommerce .sh-alert-error').first().remove();
        }

        $('.quantity').each( function() {
            if( $(this).children().is( 'input' ) ) {
                $(this).find('.sh-increase-number-down').remove();
                $(this).find('.sh-increase-number-up').remove();

                $(this).children().attr( 'type', 'text' );
                $(this).children().attr( 'class', 'sh-quantity-number' );
                $(this).prepend( '<span class="sh-noselect sh-increase-number-down">-</span>' );
                $(this).append( '<span class="sh-noselect sh-increase-number-up">+</span>' );
                $(this).addClass( 'sh-increase-numbers' );

            }
        });
    });

    var gillion_product_increase_number_min = ( $('.woocommerce-grouped-product-list.group_table').length ) ? 0 : 1;
    $(document).on('click', '.sh-increase-number-down', function(){
        var current_number_val = parseInt( $(this).parent().find('input.sh-quantity-number').val() );
        var current_number = isNaN( current_number_val ) ? 0 : current_number_val;
        current_number = current_number - 1;

        if( current_number >= gillion_product_increase_number_min ) {
            $(this).parent().find('input.sh-quantity-number').val( current_number );
            sh_increase_number_update();
        }
    });

    $(document).on('click', '.sh-increase-number-up', function(){
        var current_number_val = parseInt( $(this).parent().find('input.sh-quantity-number').val() );
        var current_number = isNaN( current_number_val ) ? 0 : current_number_val;
        current_number = current_number + 1;

        if( current_number >= 0 ) {
            $(this).parent().find('input.sh-quantity-number').val( current_number );
            sh_increase_number_update();
        }
    });



    /* Back To Top  */
    if ($('.sh-back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.sh-back-to-top').addClass('active');
                } else {
                    $('.sh-back-to-top').removeClass('active');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });

        $('.sh-back-to-top').on('click', function (e) {
            e.preventDefault();
            $(this).blur();
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });
    }


    /* Youtube controls change */
    $('iframe').each( function() {
        var iframe_src = $(this).attr('src');
        if( iframe_src ) {
        	if( iframe_src.indexOf("youtube.com") !== -1 ) {
        		return this.src + '?title=0&byline=0&portrait=0';
        	}
        }
    });


    /* Titlebar Parallax */
    if( $(window).width() >= 768 ) {
        $('.sh-titlebar-parallax').jarallax({
            speed: 0.5
        });
        $('body.single .blog-slider-item').jarallax({
            speed: 0.5
        });
    } else {
        $('.sh-titlebar-parallax').addClass('sh-titlebar-parallax-disabled');
    }


    /* Categories Widget */
    $('.widget_categories li').each(function() {
        var cat_count = $(this).clone().children().remove().end().text().trim().slice(1, -1);
        if( cat_count ) {
            $(this).find('> a').append( '<span class="count">' + cat_count + '</span>' );
        }
    });
    $('.widget_product_categories li').each(function() {
        if( $(this).find('span').html() ) {
            $(this).find('> span').html( $(this).find('span').html().slice(1, -1) );
        }
    });


    $('.widget_categories').each(function() {
        if( $(this).find('li').length > 7 ) {
            $(this).append('<div class="post-meta"><span class="widget_categories_button">' + gillion.text_show_all + '</span></div>');
        }
    });

    $('body').on('click', '.widget_categories_button', function() {
        $(this).parent().parent().find('li').css( 'display', 'block' );
        $(this).remove();
        return false;
    });


    /* Share */
    $('.sh-social-share-button').on( 'click', function() {
        $(this).next().toggleClass('sh-social-share-networks-active');
    });


    /* Header Navigation */
    function gillion_navigation() {
        $("ul.sh-nav").superfish({
            delay: gillion.header_animation_dropdown_delay,
            hoverClass: 'sh-hover',
            animation: { opacity: "show", height:'show' },
            animationOut: { opacity: "hide", height:'hide' },
            easing: gillion.header_animation_dropdown,
            speed: 500,
            speedOut: 0,
            cssArrows: false,
            pathLevels: 2,
            onBeforeShow: function() {
                if( $(this).hasClass('mega-menu-dynamic-elements') ) {
                    var self_mega = $(this);
                    $(this).find('.sh-ratio-content[data-lazy-background]').each( function() {
                        $(this).css('background-image', 'url("' + $(this).attr('data-lazy-background') + '")' );
                    });
                    $(this).find('.sh-ratio-content[data-lazy-background]').imagesLoaded( { background: true }, function() {
                        self_mega.find('.header-dynamic-categories-loader').hide();
                    });
                } else if( $(this).hasClass('sh-read-later-list') ) {
                    $(this).find('.sh-read-later-thumbnail[data-lazy-background]').each( function() {
                        $(this).css('background-image', 'url("' + $(this).attr('data-lazy-background') + '")' );
                    });
                }
            }
        });
    }

    gillion_navigation();
    if( !$('header.primary-desktop .sh-nav-social').find('a').length ) {
        $('header.primary-desktop .sh-nav-social').remove();
    }


    /* Lazy Footer Instagram */
    /*$.fn.isVisible = function() {
        var rect = this[0].getBoundingClientRect();
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            (rect.top - 1000) <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };*/
    /*var instagram_loaded = 0;
    $(window).on( 'load scroll', function(){
        if( instagram_loaded == 0 ) :
            clearTimeout(window.scrollFinished2);
            window.scrollFinished2 = setTimeout( function(){
                if( $('.sh-footer-instagram').isVisible() ) {
                }
            }, 50);
        endif;
    });*/


    /* Mobile Header Dropdown */
    $('.sh-header-mobile .sh-nav-dropdown').click(function() {
        $('.sh-header-mobile-dropdown').stop(true, true).slideToggle(
            gillion.header_animation_dropdown_speed,
            gillion.header_animation_dropdown
        );
        return false;
    });


    /* Notice */
    if( gillion.notice !== false ) {
        if( gillion.notice == 'enable2' ) {

            $('.sh-page-notice').show();
            $(".sh-page-notice-button").on('click', function() {
                $('.sh-page-notice').hide();
                return false;
            });

        } else {

            if ( 'set' !== $.cookie( 'sh-notice' ) ) {
                $('.sh-page-notice').show();
                $(".sh-page-notice-button").on('click', function() {
                    $.cookie( 'sh-notice', 'set', { expires: 356, path: '/' });
                    $('.sh-page-notice').hide();
                    return false;
                });
            }

        }
    }


    /* Lightbox */
    $("a[rel^='sh-lightbox'], a[rel^='lightbox'],a[data-rel^=lightcase]" ).lightcase({
        maxWidth: 1200,
        maxHeight: 1200,
        overlayOpacity: gillion.lightbox_opacity,
        transition: gillion.lightbox_transition,
        labels: {
            'sequenceInfo.of': ' / ',
        },
    });

    $('.sh-login-popup-trigger, .post-read-later-guest, .sh-product-wishlist-add-guest').lightcase({
        type: 'inline',
        maxWidth: 440,
        inline: {
            height: 460
        }
    });
    $('.sh-login-popup-content-login input[type="text"], .sh-login-popup-content-login input[type="password"]').attr( 'required', 'required' );


    /* Page Loader */
    if( gillion.page_loader == 1 ) {
        $(".sh-page-loader").fadeOut(500);
        $("body").css('overflow', 'visible');

		$(window).bind('beforeunload', function(e){
			$('.sh-page-loader').fadeIn();
		});
    }


    /* RTL Support */
    if( gillion.rtl_support == 1 ) {
        //custom adjustments will be added here
    }


    /* Footer Parallax */
    function gillion_footer_parallax() {
        if ($(document).width() > 850) {
            $("#wrapper > .content-container").css( 'margin-bottom', $('.sh-footer').height() );
        } else {
            $("#wrapper > .content-container").css( 'margin-bottom', '' );
        }
    }

    function gillion_footer_parallax_visible() {
        if ($(document).width() > 850) {
            if( ( $(document).height() - ($(window).scrollTop() + $(window).height()) ) < $('.sh-footer').height() ) {
                $('.sh-footer').css( 'opacity', '1');
            } else {
                $('.sh-footer').css( 'opacity', '0');
            }
        }
    }

    if( gillion.footer_parallax == 1 ) {
        $("body").addClass( 'sh-footer-paralalx-init' );

        $(window).load(function (){
            gillion_footer_parallax();
            gillion_footer_parallax_visible();
        });

        $(window).resize(function() {
            clearTimeout(window.resizedFinishedFooter);
            window.resizedFinishedFooter = setTimeout(function(){

                gillion_footer_parallax();

            }, 500);
        });

        $(window).scroll(gillion_footer_parallax_visible);
    }


    /* Read Later Functionality */
    $('.post-title, .responsive-post-read-later, .desktop-post-read-later').on('click', function(e) {
        var title_class = $(e.target).attr('class');
        if( title_class == 'post-read-later' || title_class == 'fa fa-bookmark-o' || title_class == 'fa fa-bookmark' ) {
            e.stopPropagation();
            e.preventDefault();

            if( gillion.loggedin == true ) {

                if( title_class == 'fa fa-bookmark-o' || title_class == 'fa fa-bookmark' ) {
                    var self = $(e.target).parent();
                } else {
                    var self = $(e.target);
                }

                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: gillion.siteurl+"wp-admin/admin-ajax.php",
                    data : {
                        action : 'read_later_trigger',
                        type : self.attr('data-type'),
                        post_id : self.attr('data-id'),
                    },
                    success: function( response ) {
                        if( response['post_id'] > 0 ) {

                            if( response['commit'] == 'remove') {
                                $('.post-read-later[data-id='+self.attr('data-id')+']').attr('data-type','add').html('<i class="fa fa-bookmark-o"></i>');
                                $('.sh-read-later-item[data-id='+ response['post_id'] +']').remove();
                                $('.sh-read-later-total').html( parseInt( $('.sh-read-later-total').html() ) - 1 );
                            } else if( response['commit'] == 'add') {
                                $('.post-read-later[data-id='+self.attr('data-id')+']').attr('data-type','remove').html('<i class="fa fa-bookmark"></i>');
                                $('.sh-read-later-list').prepend( response['body'] );
                                $('.sh-read-later-total').html( parseInt( $('.sh-read-later-total').html() ) + 1 );
                            }

                        }
                    }
                });

            }

            return false;
        }
    });
    $('.sh-read-later-list').on( 'click', '.sh-read-later-delete', function(e) {
        var self = $(this).parent().parent().parent();
        $.ajax({
            type: "POST",
            url: gillion.siteurl+"wp-admin/admin-ajax.php",
            data : {
                action : 'read_latter_delete',
                post_id : self.attr('data-id')
            },
            success: function( response ) {
                $('.sh-read-later-total').html( parseInt( $('.sh-read-later-total').html() ) - 1 );
                $('.post-read-later[data-id='+ parseInt( self.attr('data-id') ) +']').attr( 'data-type', 'add' ).html('<i class="ti-bookmark"></i>')
                self.fadeOut(300, function(){ $(this).remove(); return false; });
            }
        });
    });
    $('.sh-read-later-list').on( 'click', '.sh-read-later-item', function(e) {
        if( $(e.target).attr('class') == 'sh-read-later-link' && $(e.target).attr('data-href') ) {
            window.location.href = $(e.target).attr('data-href');
        }

        return false;
    });


    /* Header Slide Menu */
    $(window).load(function() {
        $('.sh-nav-menu').on( 'click', function() {
            var slide_menu_icon = $(this).find('i');
            if( !slide_menu_icon.hasClass( 'open' ) ) {
                slide_menu_icon.attr( 'class', slide_menu_icon.attr( 'data-attr-opened' )+' open' );
            } else {
                slide_menu_icon.attr( 'class', slide_menu_icon.attr( 'data-attr-closed' ) );
            }

            $('.sh-header-side').show(0).css('transform','translateX( 0px )');
            $('.sh-header-side-overlay').show(0).css('opacity','1');
            return false;
        });

        $('.sh-header-side-overlay, .sh-header-side-close').on( 'click', function() {
            $('.sh-header-side').css('transform','translateX( 320px )').delay(350).hide(0);
            $('.sh-header-side-overlay').css('opacity','0').delay(350).hide(0);

            var slide_menu_icon = $('.sh-nav-menu i');
            if( !slide_menu_icon.hasClass( 'open' ) ) {
                slide_menu_icon.attr( 'class', slide_menu_icon.attr( 'data-attr-opened' )+' open' );
            } else {
                slide_menu_icon.attr( 'class', slide_menu_icon.attr( 'data-attr-closed' ) );
            }
        });
    });


    /* Blog Content Center */
    $(window).on( 'load resize', function() {
        if( $(document).width() > 768 ) {
            $('.blog-style-left .post-item, .blog-style-left-right .post-item').each( function() {
                $(this).find('.post-container-right').css('height', $(this).find('.post-container').css('height'));
            });
        } else {
            $('.blog-style-left .post-item, .blog-style-left-right .post-item').each( function() {
                $(this).find('.post-container-right').css('height', '');
            });
        }

        $('.sh-post-author-info').css( 'height', $('.sh-post-author').height() );

        $('.sh-404-page > .row > .col-md-6').each( function() {
            $(this).css( 'height', '' );
        });
        var page_404_height = $('.sh-404-page').height();
        $('.sh-404-page > .row > .col-md-6').each( function() {
            $(this).css( 'height', page_404_height );
        });
    });


    /* Blog Video Player */
    $('.post-media-play-overlay').on('click', function(ev) {
        var videoURL = $(this).parent().find('iframe').prop('src');
        if( !videoURL.match(/vimeo.com/) ){
            $(this).parent().find('iframe').attr( 'src', $(this).parent().parent().find('iframe').attr( 'src') + "&wmode=transparent&autoplay=1&showinfo=0&controls=0&auto_play=true" );
        } else {
            $(this).parent().find('iframe').attr( 'src', $(this).parent().parent().find('iframe').attr( 'src') + "?autoplay=1" );
        }

        $(this).remove();
        ev.preventDefault();
    });


    /* Blog Gallery List */
    if( $('.post-gallery-list-background').length ) {
        $('.post-gallery-list-background').slick({
            fade: true,
            swipe: false,
            dots: false,
            arrows: false,
            cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        });
        $('.post-gallery-list-background').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $(this).parents('.sh-ratio-content').find('.post-gallery-pagination-inside-cover').text(i + '/' + slick.slideCount);
        });
        $('.post-cover-gallery-prev').click(function(){
            $(this).parents('.sh-ratio-content').find('.post-gallery-list-background').slick('slickPrev');
        })
        $('.post-cover-gallery-next').click(function(){
            $(this).parents('.sh-ratio-content').find('.post-gallery-list-background').slick('slickNext');
        });

        $(window).resize(function() {
            clearTimeout(window.resizedFinished3);
            window.resizedFinished3 = setTimeout(function(){

                $('.post-gallery-list-background').slick('refresh');

            }, 500);
        });
    }



    $('.post-gallery-list:not(.post-gallery-list-background)').slick({
        fade: true,
        swipe: false,
        dots: false,
        arrows: true,
        cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="icon icon-arrow-left-circle"></i></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="icon icon-arrow-right-circle"></i></button>'
    });
    $('.post-gallery-list:not(.post-gallery-list-background)').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $(this).parents('.post-gallery').find('.post-gallery-pagination').text(i + '/' + slick.slideCount);
    });



    $('.post-gallery-list-row').each( function() {
        var gallery_count = $(this).find('.post-gallery-list-col').length;
        if( gallery_count == 1) {
            $(this).find('.post-gallery-list-col').addClass( 'post-gallery-list-col1' );
        } else if ( gallery_count == 2) {
            $(this).find('.post-gallery-list-col').addClass( 'post-gallery-list-col2' );
        }
    });


    /* Facebook Widget Overlay */
    $('.sh-widget-facebook-overlay').on('click', function(ev) {
        $(this).fadeOut( 300 );
        setTimeout(function(){
            $(this).remove();
        }, 300);
        ev.preventDefault();
    });


    /* Twitter Widget */
    $('.sh-widget-twitter-list').each( function() {
        var self_slider = $(this);
        $(self_slider).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            speed: 900,
            cssEase: 'ease-in-out',
            autoplay: true,
            autoplaySpeed: 6000,
            dots: false,
            appendArrows: $(self_slider).parent().find('.widget-slide-arrows'),
            prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-arrow-left-circle"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon icon-arrow-right-circle"></i></button>'
        });
    });


    /* Posts Slider Widget */
    $('.sh-widget-posts-slider-init').each( function() {
        var self_slider = $(this);
        $(self_slider).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: false,
            speed: 900,
            cssEase: 'ease-in-out',
            autoplay: false,
            dots: false,
            centerPadding: '60px',
            appendArrows: $(self_slider).parent().find('.widget-slide-arrows'),
            prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-arrow-left-circle"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon icon-arrow-right-circle"></i></button>'
        });
    });


    /* Post Share Bar */
    var social_share = Object.keys( jQuery.parseJSON( gillion.social_share ) );
    if( !jQuery.isEmptyObject( social_share ) ) {
        $(".post-content-share-bar").jsSocials({
            showLabel: false,
            showCount: false,
            shares: social_share,
        });

        $(".vcg-image-container-social").each( function() {
            $(this).jsSocials({
                showLabel: false,
                showCount: false,
                shares: social_share,
                url: $(this).attr('data-url'),
                text: $(this).attr('data-title'),
            });
        });

        $(".post-content-share-side").each( function() {
            $(this).jsSocials({
                showLabel: false,
                showCount: false,
                shares: social_share,
                url: $(this).attr('data-url'),
                text: $(this).attr('data-title'),
            });
        });
    }

    /* Posts Share Bar Sticky */
    $(".post-content-share-bar").each( function() {
        var self_share = $(this);
        $(self_share).stick_in_parent({
            offset_top: $('.sh-header').height() + $('#wpadminbar').height() + 15
        });
    });

    /* Sticky Widgets */
    $('#sidebar, .gillion-columns-sticky-sidebar .vc_col-sm-4').theiaStickySidebar({
      additionalMarginTop: parseInt( $('.sh-header').height() + $('#wpadminbar').height() + 15 ),
      minWidth: 1026
    });


    $('.gillion-sticky-element').stick_in_parent({
        offset_top: parseInt( $('.sh-header').height() + $('#wpadminbar').height() + 15 ),
        sticky_class: 'sh-sticky-element'
    });



    /* Posts Related Slider */
    $('.post-related').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        infinite: false,
        speed: 900,
        cssEase: 'ease-in-out',
        autoplay: false,
        dots: false,
        appendArrows: $('.post-slide-arrows'),
        prevArrow: '<button type="button" class="slick-prev"><i class="icon icon-arrow-left-circle"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="icon icon-arrow-right-circle"></i></button>',
        responsive: [
            {
              breakpoint: 799,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
              }
            },
            {
              breakpoint: 600,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
              }
            }
          ]
    });


    /* Miscellaneous Functions */
    $('.blog-slider-mini-list').perfectScrollbar();
    $('.sh-categories-list').perfectScrollbar();
    $('.sh-read-later-list').perfectScrollbar().removeClass('sh-read-later-list-init');

    $('a[data-rel^=lightcase-post]').each( function() {
        $(this).lightcase();
    });

    $('.sh-hamburger-menu').click(function(){
		$(this).toggleClass('open');
	});

    $('.widget-item.widget_tag_cloud').each( function() {
        $(this).find('a').each( function() {
            $(this).html( '#' + $(this).html() );
        });
    });

    if( gillion.loggedin == false ) {
        $('.post-read-later').tooltipster({
            theme: 'tooltipster-borderless'
        });
    }


    if( $('.sh-widget-facebook-item').length ) {
        $('.sh-widget-facebook-item').on("mouseover", function () {
            $(this).append('<div id="fb-root"></div>');
            $(this).append('<script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script>');
        });
    }

    $('#sidebar .mc4wp-form-name').remove();


    /* AJAX - Lazy Load */
    if( $('.sh-load-more:not(.sh-load-more-product)').length ) {
        if( $('.sh-load-more.infinite').length ) {
            $(window).scroll( function() {
                if( $('.sh-load-more').length && $('.sh-load-more').isInViewport() ) {
                    if( $('.sh-load-more:not(.disabled)').length ) {
                        gillion_loadmore();
                    }
                } else if( !$('.sh-load-more').length ) {
                    $(this).off();
                }
            });
        }

        jQuery( document ).on( 'click', '.sh-load-more:not(.disabled)', function() {
            gillion_loadmore( $(this).attr('data-id') );
        });

        function gillion_loadmore( load_more_id ) {
            if( load_more_id === undefined) {
                load_more_id = '';
            }


            if( load_more_id ) {
                var lazy_self = $('.sh-load-more[data-id="'+ load_more_id +'"]');
            } else {
                var lazy_self = $('.sh-load-more');
            }


            lazy_self.addClass( 'disabled' );
            var lazy_categories = lazy_self.attr('data-categories');
            var lazy_post_style = lazy_self.attr('data-post-style');
            var lazy_offset = lazy_self.attr('data-offset');
            var lazy_posts_per_page = lazy_self.attr('data-posts-per-page');
            var lazy_paged = lazy_self.attr('data-paged');
            var lazy_element_id = lazy_self.attr('data-id');


            jQuery.ajax({
                url : gillion_loadmore_posts.ajax_url,
                type : 'post',
                data : {
                    action : 'load_more_posts',
                    categories : lazy_categories,
                    per_page: lazy_posts_per_page,
                    offset: lazy_offset,
                    post_style : lazy_post_style,
                    paged: lazy_paged,
                },
                success : function( response ) {
                    if( response == 'done' ) {
                        lazy_self.remove();
                    } else {
                        lazy_self.attr('data-paged', parseInt( $('.sh-load-more').attr('data-paged') ) + 1 );

                        if( lazy_element_id ) {

                            var lazy_add_posts = $( '.content-container .'+ lazy_element_id +' .blog-list' );
                            if( lazy_add_posts.hasClass('blog-style-masonry') ) {
                                lazy_add_posts.isotope( 'insert', $(response) ).imagesLoaded( function() {
                                    lazy_add_posts.isotope('layout').css( 'opacity', 1 );
                                });
                            } else {
                                $(response).appendTo( '.content-container .'+ lazy_element_id +' .blog-list' );
                            }

                        } else {
                            if( $( '.blog-list.blog-style-masonry' ).length ) {
                                $( '.blog-list.blog-style-masonry' ).isotope( 'insert', $(response) ).imagesLoaded( function() {
                                    $( '.blog-list.blog-style-masonry' ).isotope('layout').css( 'opacity', 1 );
                                });
                            } else {
                                $(response).appendTo( '.content-container .blog-list' ).hide().fadeIn( 700 );
                            }
                        }

                        lazy_add_posts.find(".post-content-share-side").each( function() {
                            if( !$(this).html() ) {
                                $(this).jsSocials({
                                    showLabel: false,
                                    showCount: false,
                                    shares: social_share,
                                    url: $(this).attr('data-url'),
                                    text: $(this).attr('data-title'),
                                });
                            }
                        });

                        lazy_self.removeClass( 'disabled' );
                        if( $(response).filter('.post-item').length < lazy_posts_per_page ) {
                            lazy_self.remove();
                        }

                        gillion_review_animation();

                    }
                }
            });
        }
    }


    /* AJAX - Wishlist */
    if( $('body.single-product .sh-product-wishlist-single-placeholder').length ) {
        $('.summary.entry-summary form.cart').append( '<span class="sh-product-wishlist-single">'+ $('.sh-product-wishlist-single-placeholder').html() +'</span>' );
    }

    jQuery( document ).on( 'click', '.sh-product-wishlist-add-trigger:not(.disabled)', function(e) {
        var self = $(this);
        var product_id = self.attr('data-id');
        var product_status = self.attr('data-status');
        $('.sh-product-wishlist-add-trigger[data-id='+product_id+']').addClass( 'disabled' );

        jQuery.ajax({
            url : gillion_loadmore_posts.ajax_url,
            type : 'post',
            data : {
                action : 'wishlist_item',
                product_id : product_id,
                status: product_status
            },
            success : function( response ) {
                if( response.indexOf( 'done' ) >= 0 ) {
                    if( product_status == 'add' ) {
                        $('.sh-product-wishlist-add-trigger[data-id='+product_id+']').attr( 'data-status', 'remove' );
                    } else if( product_status == 'remove' ) {
                        $('.sh-product-wishlist-add-trigger[data-id='+product_id+']').attr( 'data-status', 'add' );
                    }

                    if( $( '.woocommerce.woocommerce-wishlist' ).length ) {
                        $( '.woocommerce.woocommerce-wishlist ul.products li.post-'+product_id ).fadeOut( 400, function() {
                            $(this).remove();
                            if( !$( '.woocommerce.woocommerce-wishlist ul.products li.product' ).length ) {

                                if( $( '.woocommerce.woocommerce-wishlist .sh-pagination' ).length ) {
                                    $( '.woocommerce.woocommerce-wishlist .sh-pagination a.page-numbers' ).not('.current, .next, .prev').first().get(0).click();
                                } else {
                                    $( '.woocommerce-wishlist-not-found' ).fadeIn();
                                }
                            }
                        });
                    }
                }

                $('.sh-product-wishlist-add-trigger[data-id='+product_id+']').removeClass( 'disabled' );
            }
        });

        e.stopPropagation();
        e.preventDefault();
        return false;
    });


    /* WooCommerce */
    if( $('body.gillion-woocommerce').length) {

        /* WooCommerce- Stock */
        if( $('.woocommerce div.product p.stock' ).length ) {
            $('.woocommerce div.product div.product_meta' ).prepend( '<span class="product_stock product-stock-information"><span class="product_meta_name">Stock</span><span class="'+ $('.woocommerce div.product p.stock' ).attr('class') +'">' + $('.woocommerce div.product p.stock' ).html() + '</span></span>' );
        }

        $('.woocommerce-products-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.woocommerce-products-nav'
        });
        $('.woocommerce-products-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.woocommerce-products-for',
            dots: false,
            focusOnSelect: true,
            arrows: false,
            responsive: [
                {
                    breakpoint: 1000,
                    settings: { slidesToShow: 3 }
                }
            ]
        });
        $('.woocommerce-products-for').on( 'afterChange', function( event, slick, currentSlide, nextSlide ) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $('.woocommerce-product-gallery .post-gallery-pagination').text( i + '/' + slick.slideCount );
        });


        /* Account Placeholders */
        if( $('body.gillion-woocommerce.woocommerce-edit-account:not(.sh-wc-labels-on)').length ||
            $('body.gillion-woocommerce.woocommerce-edit-address:not(.sh-wc-labels-on)').length ||
            $('body.woocommerce-checkout:not(.sh-wc-labels-on)').length ) {

                $('body.gillion-woocommerce.woocommerce-edit-account .woocommerce-MyAccount-content input').each( function() {
                    $(this).attr( 'placeholder', $(this).parent().find('label').text() );
                    $(this).attr( 'title', $(this).attr( 'placeholder' ) );
                });

                $('body.gillion-woocommerce.woocommerce-edit-address .woocommerce-MyAccount-content input').each( function() {
                    $(this).attr( 'placeholder', $(this).parent().find('label').text() );
                    $(this).attr( 'title', $(this).attr( 'placeholder' ) );
                });

                $('body.woocommerce-checkout .woocommerce-billing-fields input').each( function() {
                    $(this).attr( 'placeholder', $(this).parent().parent().find('label').text() );
                    $(this).attr( 'title', $(this).attr( 'placeholder' ) );
                });
        }


        /* AJAX - Load more products */
        jQuery( document ).on( 'click', '.sh-load-more-product:not(.disabled)', function() {
            gillion_loadmore_products();
        });

        function gillion_loadmore_products() {
            var lazy_self = $('.sh-load-more-product');
            lazy_self.addClass( 'disabled' );
            var lazy_categories = lazy_self.attr('data-categories');
            var lazy_post_style = lazy_self.attr('data-post-style');
            var lazy_posts_per_page = lazy_self.attr('data-posts-per-page');
            var lazy_paged = lazy_self.attr('data-paged');
            jQuery.ajax({
                url : gillion_loadmore_posts.ajax_url,
                type : 'post',
                data : {
                    action : 'load_more_products',
                    per_page: lazy_posts_per_page,
                    paged: lazy_paged,
                },
                success : function( response ) {
                    if( response == 'done' ) {
                        $('.sh-load-more-product').remove();
                    } else {
                        $(response).appendTo( '.vcg-woocommerce-products ul.products' );

                        $('.sh-load-more-product').attr('data-paged', parseInt( $('.sh-load-more-product').attr('data-paged') ) + 1 );
                        lazy_self.removeClass( 'disabled' );

                        if( $(response).filter('.type-product').length < lazy_posts_per_page ) {
                            $('.sh-load-more-product').remove();
                        }

                    }
                }
            });
        }
    }


    /* Remove unused slider buttons */
    if( $('body').hasClass( 'sh-carousel-style2' ) ) {
        $( window ).load(function() {
            $('.widget-slide-arrows, .post-slide-arrows').each( function() {
                if( !$(this).html() ) {
                    $(this).remove();
                }
            });
        });
    }


    /* Review Animation */
    function gillion_review_animation() {
        $(".sh-pie:not(.loaded)").each( function() {
            if( $(this).isInViewport() && !document.hidden ) {
                $(this).find( 'circle' ).css( 'stroke-dashoffset', $(this).attr( 'data-offset' ) + 'px' );
                $(this).addClass( 'loaded' );

                var self = $(this);
                jQuery({
                    Counter: 0
                }).animate({
                    Counter: parseFloat( self.attr( 'data-score' ) ) * 10
                }, {
                    duration: 1500,
                    easing: 'swing',
                    step  : function(now, fx){
                        self.attr( 'data-score', parseFloat(now/10).toFixed(1) );
                    }
                });
            }
        });
    }
    $(window).scroll(function() {
        clearTimeout(window.scrollFinished);
        window.scrollFinished = setTimeout(function(){

            gillion_review_animation();

        }, 250);
    });




    // Fix jssocials share Whatsapp and Messenger links for web
    if( $(document).width() > 1024 ) {
        $('.jssocials-share-whatsapp a').each( function() {
            $(this).attr( 'href', 'https://web.whatsapp.com/send?text=' + encodeURI( document.title ) + '%0D%0A' + encodeURI( window.location.href ) );
        });
    }
});


/* Load functions */
(function( $ ){

    /* Shufflehound Carousel */
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();

        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $.fn.sh_carousel = function() {

        /* Prepair Carusel */
        $(this).html( '<div class="sh-carousel-items">' + $(this).html() + '</div>' );
        var self_main = $(this);
        var self = $(this).find('.sh-carousel-items');
        self.find('.blog-textslider-post:first-child').addClass( 'sh-active' );


        /* Add Buttons */
        self_main.append( '<span class="sh-carousel-buttons sh-carousel-buttons-styling"></span>' );
        self_main.find( '.sh-carousel-buttons' ).append( '<span class="sh-carousel-prev"><i class="icon icon-arrow-left-circle"></i></span>' );
        self_main.find( '.sh-carousel-buttons' ).append( '<span class="sh-carousel-next"><i class="icon icon-arrow-right-circle"></i></span>' );


        /* Add Button Actions */
        self_main.find('.sh-carousel-prev').on( 'click', function() {
            var active = self.find( '.blog-textslider-post.sh-active' );
            var prev = active.prev();

            /* If one the last slide */
            if( !prev.length ) {
                prev = self.find( '.blog-textslider-post:last-child' );
            }

            active.removeClass( 'sh-active' );
            prev.addClass( 'sh-active' );
        });

        self_main.find('.sh-carousel-next').on( 'click', function() {
            if( self.isInViewport() && !document.hidden ) {
                var active = self.find( '.blog-textslider-post.sh-active' );
                var next = active.next();

                /* If one the last slide */
                if( !next.length ) {
                    next = self.find( '.blog-textslider-post:first-child' );
                }

                active.removeClass( 'sh-active' );
                next.addClass( 'sh-active' );
            }
        });


        /* Start Carousel */
        if( !$('body').hasClass( 'elementor-editor-active' ) ) {
            var speed = 5000;
            var run = setInterval( function(){ self_main.find('.sh-carousel-next').trigger('click'); }, speed);
            self_main.hover(
                function() {
                    clearInterval(run);
                },
                function() {
                     run = setInterval( function(){ self_main.find('.sh-carousel-next').trigger('click'); }, speed);
                }
            );
        }

    }

})( jQuery );



/*
** After loaded
*/
window.addEventListener( 'load', function() {
    jQuery( function($) {
        // Fix Facebook widget plceholder image issue
        $('.sh-widget-facebook-item').css( 'min-height', 'auto' ).trigger( 'mouseenter' );


        /* Header - Search Actions */
        $(".sh-nav-search").on( 'click', function(e) {
            $(".sh-header-search-side").css('width', 'auto').css('height', 'auto').css('opacity', '1');
            $(".sh-header-search-side-input").focus();
            return false;
        });
        $(".sh-header-search-side").on( 'click', function(e) {
            var search_class = $( e.target ).attr('class');
            if( search_class != 'sh-header-search-side-input' && search_class != 'sh-header-search-side-icon' && search_class != 'ti-search' ) {
                $(".sh-header-search-side").css('opacity', '0');
                setTimeout(function(){
                    $(".sh-header-search-side").css('width', '0px').css('height', '0px');
                }, 300);
            }
            return false;
        });

        $('.sh-header-search-side-icon').on( 'click', function() {
            $('.sh-header-search-form').submit();
        });

        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                $("#header-search").fadeOut("fast");
            }
        });
    });
});
