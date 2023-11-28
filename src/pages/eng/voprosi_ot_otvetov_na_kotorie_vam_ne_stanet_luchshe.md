---
title: "Questions That Won't Make You Feel Better After Knowing the Answers"
date: "2020-06-03 22:43:00"
lang: "eng"
type: "main"
description: "This intriguing article compiles a series of complex and thought-provoking questions from various JS interviews, covering topics from React JS/Native to CSS and DOM. The article doesn’t necessarily provide answers but presents these questions to reflect on the depth and complexity of JavaScript and web development."
keywords: "JavaScript interview questions, React JS, React Native, Redux, programming questions, web development, JS Object, DOM, CSS, JavaScript challenges, coding interview, software engineering, frontend development, backend development, React lifecycle, Redux middleware, web technologies, programming concepts, JavaScript complexities, coding problems, developer interviews, web programming, coding knowledge, JavaScript intricacies"
---

I created this note to jot down questions that were (or were not) asked of me in (or out of) JS interviews.

Here you won't find answers to these questions (or maybe a few), just questions.

And when you find answers to these questions elsewhere, it won't make you feel any better. These are just questions that someone asks someone.

---

## React JS / Native ##

_______________________

- What is the life cycle of a component? What arguments come in which method? Where and how is it best to update the state?
- What is a functional component and PureComponent? What's the difference?
- What is Redux?
- What are side-effects?
- What kinds of middlewares are there in Redux?
- What is redux-thunk used for?
- What is redux-saga built on (generators) and what is it used for?
- React Router and redux-router. What? Why? How?
- Why is the second argument used in the setState function?
- From which version of React have you been using and what major changes have occurred during this time?
- What breaking changes occurred in version 16?
- What is the Context API and what changes have occurred in it?
- What is Flux architecture and how does it differ from the Redux implementation?
- React and Vue - which is better and for what tasks?
- Redux and MobX - which is better and for what tasks? What other libraries are there for managing the state of an application?
- Server-Side Rendering?
- What is a Higher-Ordered Component?
- What is React Native? Why is it used? What's the difference from regular React? (yes, that's exactly how they asked me)
- How to render a component at a specified time?

## Java Script ##

_______________________

- So what is a *closure*, finally!?
- How does the Event Loop work? Tasks, microtasks, queues, etc.?
- What is garbage collector in js and how does it work? (no references - no object, there is a reference - there is suffering)
- What is delegation? (when we hang a handler on a container and check the click on the element inside - yes, they still ask)
- What is LocalStorage and how is it different from Cookies? How to protect a cookie so that it cannot be read by js (HttpOnly flag)?
- What is WebSocket? What is long-polling and how are they different? What problems do they solve?
- ServiceWorker / WebWorker / SharedWorker? What is it? Why? How?
- event.preventDefault() and event.stopPropagation() - why and when?
- What's interesting in the new proposals and what are you looking forward to the most?
- What is a higher-ordered function? (once I was asked an additional question - "can you pass a function to it?" and it was a very strange question!)
- What is a Promise? How to debug errors?
- What is Async/Await and what do transpilers compile it into? And how to debug them?
- What are generators?
- What is Proxy?
- TypeScript / Flow? What is it and why is it?
- What is optimistic rendering? How would you implement it?
- What is virtual scroll? How does it work?
- What is node.js?
- What is d3? Why is it needed?
- How do generators work?
- Write a generator that implements the Fibonacci sequence (live coding is not my thing at all, after the interview I thought and [wrote](https://gist.github.com/gthrm/7274dc2bf8149944f8360325a6673642))

## DOM ##

- DOM Events: 3 phases of event propagation (
    Capturing phase - the event goes down from the top.
    Target phase - the event reaches the target (source) element.
    Bubbling stage - the event starts to rise.
).
- How to prevent bubbling? (event.stopPropagation(), event.stopImmediatePropagation())

## CSS ##

_______________________

- If it comes to css, for some reason they still ask about ways to "center a block in the middle of the screen". In 2k18!
- Preprocessors and their pros/cons relative to each other (this is usually a question about experience and somehow no one asked about postcss)?
- css-modules / styled-components. What is it? Why? Pros and cons?
- What are the values for display and are there any elements that are inline-block by default (img)?
- What's the difference between opacity: 0 and opacity: 0.00001?
- What's the difference between visibility: hidden and display: none?
- [What is float? How to clear it? What does .clearfix consist of](https://webref.ru/course/float/clearfix)?
- What's the difference between box-sizing: content-box and border-box?
- Through which directives is responsive design implemented?
- What color will the text be if ...

## Other Browser ##

_______________________

- What is SVG? What are the ways to insert SVG on the page? SVG animations?
- What is canvas and why is it so fast?
- What are the ways to optimize the application? (sprites, minification, lazy-load, etc.)
- How many simultaneous requests can be sent from the browser to a specific domain? How is the problem with the limitation solved? Does http/2 solve it?

## Other Programming ##

_______________________

- What patterns are there? List the ones you know and explain briefly? (usually they talk about mediator, factory, and decorator)
- What design patterns do you know and what are their features? (like MVC and MVVM)
- What is a pure function?
- What types of programming languages are there (functional/imperative)? What is the essence of these paradigms? To which paradigm does JS belong?
- How do compiled languages differ from interpreted ones? What are the interpreted languages? Where is their code interpreted?
- What is Rx?
- What is REST and how does it differ from RPC? CRUD?
- What's the difference between GET and POST? What other types of requests are there and what are they used for?
- At what level of OSI do http / tcp / ping / json / twisted pair occur?
- What happens after a request from a browser to open a certain page?
- S.O.L.I.D.?
- What is JSON? What is XML? Continue the list (I only remembered YAML)? Can XML be converted to JSON?
- What is protobuf and messagepack? What's the difference?
- What are microservices? Why are they? What problems does microservice architecture solve?
- What is mutability and immutability?

After all this, one most important question remains in mind: did I become happier knowing the answers to all these questions?

![alt text](<https://cloud.cdroma.ru/upload/18abc9fb-dbdb-4161-a48c-48789b974458-1700955531715.jpeg>)
