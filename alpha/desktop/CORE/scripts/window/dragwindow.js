// JavaScript Document ///////////////////////////////////////////////////
//																		//
//	Original Code by Copyright 2001 by Mike Hall.						//
//	Adapted and Modified by Brandon Davis - bdavis@xproduct.net - 2012  //
//																		//
//	GNU General Public License as published by the Free Software 		//
//  Foundation, either version 2 of the License or (at your option) any	//
//  later version. No support, guarantee or warrantee is offered or		//
//  implied. By using any code found on this site you assume full risk	//
//  and responsibility for that use.									//
//																		//
//	This notice is not to be removed.									//
//																		//
//////////////////////////////////////////////////////////////////////////

// Determine browser and version.
function Browser() {
	var ua, s, i;
	
	this.isIE    = false;
	this.isNS    = false;
	this.version = null;
	
	ua = navigator.userAgent;
	
	s = "MSIE";
	if ((i = ua.indexOf(s)) >= 0) {
		this.isIE = true;
		this.version = parseFloat(ua.substr(i + s.length));
		return;
	}
	
	s = "Netscape6/";
	if ((i = ua.indexOf(s)) >= 0) {
		this.isNS = true;
		this.version = parseFloat(ua.substr(i + s.length));
		return;
	}
	
	s = "Gecko";
	if ((i = ua.indexOf(s)) >= 0) {
		this.isNS = true;
		this.version = 6.1;
		return;
	}
}

var browser = new Browser();

// Global object to hold drag information.

var dragObj = new Object();
dragObj.zIndex = 0;

function dragStart(event, id) {
	
	var el;
	var x, y;
	
	// If an element id was given, find it. Otherwise use the element being
	// clicked on.
	
	if (id) {
		dragObj.elNode = document.getElementById(id);
	}
	else {
		if (browser.isIE) {
			dragObj.elNode = window.event.srcElement;
		}
		if (browser.isNS) {	
			dragObj.elNode = event.target;
		}
	
	// If this is a text node, use its parent element.
	
	if (dragObj.elNode.nodeType == 3)
		dragObj.elNode = dragObj.elNode.parentNode;
	}

	// Get cursor position with respect to the page.
	
	if (browser.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
	}
	if (browser.isNS) {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	
	//GET position of current element
	
	var curLpost = document.getElementById(id).offsetLeft;
	var curTpost = document.getElementById(id).offsetTop;
	
	/*if(curLpost == "") {
		var curLpost = 139;
		var curTpost = 64;
	}*/

	//alert(curLpost + " by " + curTpost);
	
	// Save starting positions of cursor and element.
	
	dragObj.cursorStartX = x;
	dragObj.cursorStartY = y;
	dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
	dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
	
	if (isNaN(dragObj.elStartLeft)) { dragObj.elStartLeft = curLpost; }
	if (isNaN(dragObj.elStartTop)) { dragObj.elStartTop  = curTpost; }

	// Update element's z-index.
	
	dragObj.elNode.style.zIndex = ++dragObj.zIndex;
	
	// Capture mousemove and mouseup events on the page.
	
	if (browser.isIE) {
		document.attachEvent("onmousemove", dragGo);
		document.attachEvent("onmouseup",   dragStop);
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}
	if (browser.isNS) {
		document.addEventListener("mousemove", dragGo,   true);
		document.addEventListener("mouseup",   dragStop, true);
		event.preventDefault();
	}
}

function dragGo(event) {

	var x, y;
	
	// Get cursor position with respect to the page.
	
	if (browser.isIE) {
		x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
	}
	if (browser.isNS) {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}
	
	// Move drag element by the same amount the cursor has moved.
	dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
	
	if ((dragObj.elStartTop  + y - dragObj.cursorStartY) <= 24) {
		dragObj.elNode.style.top  = "24px";
	}
	else {
		dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
	}
	
	if (browser.isIE) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}
	if (browser.isNS)
		event.preventDefault();
	}

function dragStop(event) {
// Stop capturing mousemove and mouseup events.

	if (browser.isIE) {
		document.detachEvent("onmousemove", dragGo);
		document.detachEvent("onmouseup",   dragStop);
	}
	if (browser.isNS) {
		document.removeEventListener("mousemove", dragGo,   true);
		document.removeEventListener("mouseup",   dragStop, true);
	}
}

function windowClick(event, id) {
	if (id) {
		dragObj.elNode = document.getElementById(id);
	}
	else {
		if (browser.isIE) {
			dragObj.elNode = window.event.srcElement;
		}
		if (browser.isNS) {	
			dragObj.elNode = event.target;
		}
	// If this is a text node, use its parent element.
	
	if (dragObj.elNode.nodeType == 3)
		dragObj.elNode = dragObj.elNode.parentNode;
	}
	// Update element's z-index
	dragObj.elNode.style.zIndex = ++dragObj.zIndex;	
}
//]]>