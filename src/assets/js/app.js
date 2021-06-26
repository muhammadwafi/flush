/*===========================================
=            MWadmin main script            =
=============================================*/
// bootstrap
require("bootstrap");
require("bootstrap/dist/css/bootstrap.min.css");
// app.scss
require("../scss/app.scss");
// smooth-scrollbar
import Scrollbar from 'smooth-scrollbar';
require("../scss/plugins/_smoothScrollbar.scss");
// highlight.js
import hljs from 'highlight.js';
require("highlight.js/styles/github.css");
// clipbord.js
import ClipboardJS from "clipboard";
// Material Ripples
require("./plugins/ripples/ripples.min");
require("./plugins/ripples/ripples.css");
// Feather icons
const feather = require('feather-icons');
// Selectize.js
require("selectize");
require("selectize/dist/css/selectize.default.css");
// generate
require("./plugins/generateElement");
// wrap ava
require("./modules/avatarWrap");
// flushTabs
require("./modules/fl-tabs");

$.flushUI = function (element, options) {
	$(".featherIconAll").generateFeatherIcon();
	function init() {
		// Scrollbar init
		Scrollbar.initAll();	
		// Popper dropdown
		// see: https://github.com/twbs/bootstrap/issues/23590
		Popper.Defaults.modifiers.computeStyle.gpuAcceleration = !(window.devicePixelRatio < 1.5 && /Win/.test(navigator.platform));
		$('.dropdown').on('show.bs.dropdown', function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
		});
		$('.dropdown').on('hide.bs.dropdown', function() {
			$(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
		});
		$(document).on('click', '.dropdown-menu', function (e) {
			e.stopPropagation();
		});
		// Popper tooltip
		$('[data-toggle="tooltip"]').tooltip();
		// highlight.js
		hljs.initHighlightingOnLoad();
		hljs.registerLanguage('html', require('highlight.js/lib/languages/htmlbars'));
		hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
		// Material Ripples
		$.material.init();
		$.material.ripples(".btn, button, .thumb-style, a:not(.withoutripple):not(.card-link)");
		// feather
		feather.replace();
		// ==========================================================================
		// Clipboard
		// add focused class at input group addon, prepend, append
		// ==========================================================================
		$(".syntax-highlight").each(function(elem) {
			var template = '<div class="fl-clipboard"><button class="fl-clipboard__btn" title="Copy to clipboard">Copy</button></div>';
			// inject clipboard button
			$(this).before(template);
			$(".fl-clipboard__btn").tooltip().on("mouseleave",function() { 
				$(this).tooltip("hide");
			});
		});
		var clipboard = new ClipboardJS('.fl-clipboard__btn', {
			target: function(trigger) {
				return trigger.parentNode.nextElementSibling;
			}
		});
		clipboard.on('success', function(e) {
			$(e.trigger).attr("title","Copied!").tooltip("_fixTitle").tooltip("show").attr("title","Copy to clipboard").tooltip("_fixTitle");	
			console.log("success copy");
			e.clearSelection();
		});
		clipboard.on('error', function(e) {
			var osType = /Mac/i.test(navigator.userAgent) ? "⌘" : "Ctrl-";
			var man_instructions = "Press " + osType + " to copy";
			$(e.trigger).attr("title", man_instructions).tooltip("_fixTitle").tooltip("show").attr("title","Copy to clipboard").tooltip("_fixTitle");
			console.log("error copy");
		});
		// ==========================================================================
		// INPUT GROUP FOCUSED
		// add focused class at input group addon, prepend, append
		// ==========================================================================
		$(".form-control").focus(function () {
			// input group addon
			$(this).prev(".input-group-addon").addClass("focused");
			$(this).next(".input-group-addon").addClass("focused");
			// input group append & prepend
			$(this).prev(".input-group-prepend").addClass("focused");
			$(this).next(".input-group-append").addClass("focused");
		});
		$(".form-control").focusout(function () {
			// input group addon
			$(this).prev(".input-group-addon").removeClass("focused");
			$(this).next(".input-group-addon").removeClass("focused");
			// input group append & prepend
			$(this).prev(".input-group-prepend").removeClass("focused");
			$(this).next(".input-group-append").removeClass("focused");
		});
		// ==========================================================================
		// Selectize CONFIG
		// config selectize lib - more info https://selectize.github.io/selectize.js/
		// ==========================================================================
		var isSingleChoice = document.getElementsByClassName("single-choice");
		if (isSingleChoice) {
			$('.single-choice').selectize({
				create: false,
				sortField: 'text',
				onDropdownOpen: function ($dropdown) {
					$dropdown.stop(true, true).hide().slideToggle(150);
				},
				onDropdownClose: function ($dropdown) {
					$dropdown.stop(true, true).show().slideToggle(150);
				}
			});
		}
		var isMultiChoice = document.getElementsByClassName("multi-choice");
		if (isMultiChoice) {
			$('.multi-choice').selectize({
				delimiter: ',',
				persist: false,
				create: function(input) {
					return {
						value: input,
						text: input
					};
				},
				onDropdownOpen: function ($dropdown) {
					$dropdown.stop(true, true).hide().slideToggle(150);
				},
				onDropdownClose: function ($dropdown) {
					$dropdown.stop(true, true).show().slideToggle(150);
				}
			});
		}
		// sidenav stick
		$('.sidenav-sticky > li > a').on('click', function(e){
			e.preventDefault();
			var hash = $(this).attr('href');
			$('html,body').animate({
				scrollTop: $(hash).offset().top
			}, 300);
			return false;
		});
		var isAvatarGroup = document.getElementsByClassName("avatar-group");
		if (isAvatarGroup) {
			$(".avatar-group").elevateAvatar();
		}
		var isNavTabs = document.getElementsByClassName("fl-tabs");
		if (isNavTabs) {
			$(".fl-tabs").flushTabs();
		}
	}
	init();

	function scrollHeader() {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 10) {
				$(".fl-header").addClass("scrolled");
			} else {
				$(".fl-header").removeClass("scrolled");
			}
		});
	}
	scrollHeader();
	
	/*----------  Sidebar Menu  ----------*/	
	function sidebarMenu() {
		var $sidebarNav = $('.fl-sidebar__nav .has-dropdown >.nav-link.active');
		if ($sidebarNav) {
			$sidebarNav.next().toggleClass('show');
			$sidebarNav.next().slideToggle(0);
		}

		// auto active state menu based on link
		var current = location.pathname.split('#')[0];

		$('.fl-sidebar__nav .nav-link').each(function () {
			var $this = $(this);
			var $isInSubMenu = $this.parent().parent().find('li ul.sub-menu');
			
			if ($this.attr('href') == current) {
				console.log($this.attr('href'));
				console.log("Current: " + current);
				
				$this.addClass("active");
				if ($isInSubMenu) {
					$this.parent().closest('li ul.sub-menu').toggleClass('show');
					$this.parent().closest('li ul.sub-menu').prev().toggleClass('active');
					$this.parent().closest('li ul.sub-menu').slideToggle(150);
				}
			}
		});

		$('.fl-sidebar__nav .has-dropdown >.nav-link').click(function(e) {
			e.preventDefault();
			var $this 			= $(this);
			var $otherSubMenu 	= $this.parent().parent().find('li ul.sub-menu');
			var $thisSubMenu 	= $this.next();

			// if the sub-menu were open, close it!
			if ($thisSubMenu.hasClass('show') || $thisSubMenu.hasClass('active')) {
				$thisSubMenu.removeClass('show active');
				$thisSubMenu.slideUp(150);
				$this.removeClass('active');
			} else {
				// if the other sub-menu were open, close it first!
				$otherSubMenu.removeClass('show active');
				$otherSubMenu.slideUp(150);
				// removing all active classes on nav-link 
				$this.parent().parent().find('li.nav-item .nav-link').removeClass('active');
				// if no other sub-menu were open toggle this sub
				$thisSubMenu.toggleClass('show');
				$thisSubMenu.slideToggle(150);
				$this.toggleClass('active');
			}
		});
	}
	sidebarMenu();
};

$.fn.flushUI = function (options) {
	return this.each(function () {
		if (undefined == $(this).data("flushUI")) {
			var plugin = new $.flushUI(this, options);
			$(this).data("fl", plugin);
		}
	});
};

$("body").flushUI();
console.log("Started");
