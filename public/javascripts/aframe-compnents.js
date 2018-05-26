 AFRAME.registerComponent("curve-movement", {
     schema: {
         debug: { "default": !1 },
         type: { "default": "single" },
         restTime: { "default": 150 },
         speed: { "default": 3 },
         loopStart: { "default": 1 },
         timeOffset: { "default": 0 }
     },
     init: function() {
         this.direction = 1;
     },
     isClosed: function() { 
        return "loop" === this.data.type 
    },
     addPoints: function(t) { 
        var e, i, n = this.data; "loop" === n.type && (t = t.slice(0), t.push(t[this.data.loopStart])), e = this.spline = s(), e.initFromArray(t), this.currentPointIndex = 0, i = e.getLength().chunks, this.cycleTimes = i.map(function(t, e) { return 0 === e ? null : (t - i[e - 1]) / n.speed * 1e3 }).filter(function(t) { return null !== t }), this.time = this.data.timeOffset, this.initTime = null, this.restTime = 0, this.direction = 1, this.end = !1 },
     update: function() {
         var t = this.data,
             e = this.el;
         t.debug ? e.setAttribute("spline-line", { pointer: "movement-pattern.movementPattern.spline" }) : e.removeAttribute("spline-line")
     },
     play: function() { this.time = this.data.timeOffset, this.initTime = null },
     tick: function(t, e) {
         var s, n, o, a = this.data,
             l = this.el,
             r = this.spline;
         if (this.initTime || (this.initTime = t), !this.end && (this.isClosed() || this.currentPointIndex !== r.points.length - 1)) {
             s = this.cycleTimes[this.currentPointIndex];
             var h = 0,
                 c = !1;
             if (this.time > s ? (h = 1, c = !0) : h = this.time / s, this.direction === -1 && (h = 1 - h), n = "single" === a.type ? i(h) : h, this.time = t - this.initTime, this.time < 0) return void console.log(n);
             o = r.getPointFrom(n, this.currentPointIndex), l.setAttribute("position", { x: o.x, y: o.y, z: o.z }), this.lastPercent = n, c && (1 === this.direction ? this.currentPointIndex === r.points.length - 2 ? "single" === a.type ? this.end = !0 : "loop" === a.type ? this.currentPointIndex = this.data.loopStart : this.direction = -1 : this.currentPointIndex++ : (this.currentPointIndex--, this.currentPointIndex < this.data.loopStart && (this.currentPointIndex = this.data.loopStart, this.direction = 1)), this.initTime = t, this.time = 0)
         }
     }
 })