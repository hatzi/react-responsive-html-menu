import { jsdom } from 'jsdom';
import chai from 'chai';
import sinon from 'sinon';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.expect = chai.expect;
global.sinon = sinon;
