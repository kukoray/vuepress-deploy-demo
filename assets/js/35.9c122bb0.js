(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{455:function(s,t,a){"use strict";a.r(t);var i=a(65),e=Object(i.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"近似推断"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#近似推断"}},[s._v("#")]),s._v(" 近似推断")]),s._v(" "),a("p",[s._v("这一讲中的近似推断具体描述在深度生成模型中的近似推断。推断的目的有下面几个部分：")]),s._v(" "),a("ol",[a("li",[s._v("推断本身，根据结果（观测）得到原因（隐变量）。")]),s._v(" "),a("li",[s._v("为参数的学习提供帮助。")])]),s._v(" "),a("p",[s._v("但是推断本身是一个困难的额任务，计算复杂度往往很高，对于无向图，由于节点之间的联系过多，那么因子分解很难进行，并且相互之间都有耦合，于是很难求解，仅仅在某些情况如 RBM 中可解，在有向图中，常常由于条件独立性问题，如两个节点之间条件相关（explain away），于是求解这些节点的条件概率就很困难，仅仅在某些概率假设情况下可解如高斯模型，于是需要近似推断。")]),s._v(" "),a("p",[s._v("事实上，我们常常讲推断问题变为优化问题，即：")]),s._v(" "),a("p",[a("span",{staticClass:"katex-display"},[a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("mi",[s._v("L")]),a("mi",[s._v("o")]),a("mi",[s._v("g")]),a("mo",[s._v("−")]),a("mi",[s._v("l")]),a("mi",[s._v("i")]),a("mi",[s._v("k")]),a("mi",[s._v("e")]),a("mi",[s._v("h")]),a("mi",[s._v("o")]),a("mi",[s._v("o")]),a("mi",[s._v("d")]),a("mo",[s._v(":")]),a("msub",[a("mo",[s._v("∑")]),a("mrow",[a("mi",[s._v("v")]),a("mo",[s._v("∈")]),a("mi",[s._v("V")])],1)],1),a("mi",[s._v("log")]),a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[s._v("Log-likehood:\\sum\\limits_{v\\in V}\\log p(v)\n")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"1.050005em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"2.3717110000000003em","vertical-align":"-1.321706em"}}),a("span",{staticClass:"base displaystyle textstyle uncramped"},[a("span",{staticClass:"mord mathit"},[s._v("L")]),a("span",{staticClass:"mord mathit"},[s._v("o")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("g")]),a("span",{staticClass:"mbin"},[s._v("−")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.01968em"}},[s._v("l")]),a("span",{staticClass:"mord mathit"},[s._v("i")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03148em"}},[s._v("k")]),a("span",{staticClass:"mord mathit"},[s._v("e")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathit"},[s._v("o")]),a("span",{staticClass:"mord mathit"},[s._v("o")]),a("span",{staticClass:"mord mathit"},[s._v("d")]),a("span",{staticClass:"mrel"},[s._v(":")]),a("span",{staticClass:"mop op-limits"},[a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"1.194336em","margin-left":"0em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle scriptstyle cramped"},[a("span",{staticClass:"mord scriptstyle cramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mrel"},[s._v("∈")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.22222em"}},[s._v("V")])])])]),a("span",{staticStyle:{top:"-0.000005000000000032756em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",[a("span",{staticClass:"op-symbol large-op mop"},[s._v("∑")])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])])])]),s._v(" "),a("p",[s._v("对上面这个问题，由于：")]),s._v(" "),a("p",[a("span",{staticClass:"katex-display"},[a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("mi",[s._v("log")]),a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",[s._v(")")]),a("mo",[s._v("=")]),a("mi",[s._v("log")]),a("mfrac",[a("mrow",[a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",{attrs:{separator:"true"}},[s._v(",")]),a("mi",[s._v("h")]),a("mo",[s._v(")")])],1),a("mrow",[a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1)],1),a("mo",[s._v("=")]),a("mi",[s._v("log")]),a("mfrac",[a("mrow",[a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",{attrs:{separator:"true"}},[s._v(",")]),a("mi",[s._v("h")]),a("mo",[s._v(")")])],1),a("mrow",[a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1)],1),a("mo",[s._v("+")]),a("mi",[s._v("log")]),a("mfrac",[a("mrow",[a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1),a("mrow",[a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1)],1)],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[s._v("\\log p(v)=\\log\\frac{p(v,h)}{p(h|v)}=\\log\\frac{p(v,h)}{q(h|v)}+\\log\\frac{q(h|v)}{p(h|v)}\n")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"1.427em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"2.363em","vertical-align":"-0.936em"}}),a("span",{staticClass:"base displaystyle textstyle uncramped"},[a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mrel"},[s._v("=")]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord reset-textstyle displaystyle textstyle uncramped"},[a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"}),a("span",{staticClass:"mfrac"},[a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.686em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle cramped"},[a("span",{staticClass:"mord textstyle cramped"},[a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticStyle:{top:"-0.2300000000000001em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped frac-line"})]),a("span",{staticStyle:{top:"-0.677em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped"},[a("span",{staticClass:"mord textstyle uncramped"},[a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mpunct"},[s._v(",")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"})]),a("span",{staticClass:"mrel"},[s._v("=")]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord reset-textstyle displaystyle textstyle uncramped"},[a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"}),a("span",{staticClass:"mfrac"},[a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.686em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle cramped"},[a("span",{staticClass:"mord textstyle cramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticStyle:{top:"-0.2300000000000001em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped frac-line"})]),a("span",{staticStyle:{top:"-0.677em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped"},[a("span",{staticClass:"mord textstyle uncramped"},[a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mpunct"},[s._v(",")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"})]),a("span",{staticClass:"mbin"},[s._v("+")]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord reset-textstyle displaystyle textstyle uncramped"},[a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"}),a("span",{staticClass:"mfrac"},[a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.686em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle cramped"},[a("span",{staticClass:"mord textstyle cramped"},[a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticStyle:{top:"-0.2300000000000001em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped frac-line"})]),a("span",{staticStyle:{top:"-0.677em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped"},[a("span",{staticClass:"mord textstyle uncramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"})])])])])])]),s._v(" "),a("p",[s._v("左右两边对 "),a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("mi",[s._v("h")])],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[s._v("h")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"0.69444em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"0.69444em","vertical-align":"0em"}}),a("span",{staticClass:"base textstyle uncramped"},[a("span",{staticClass:"mord mathit"},[s._v("h")])])])]),s._v(" 积分：")]),s._v(" "),a("p",[a("span",{staticClass:"katex-display"},[a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("msub",[a("mo",[s._v("∫")]),a("mi",[s._v("h")])],1),a("mi",[s._v("log")]),a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",[s._v(")")]),a("mo",[s._v("⋅")]),a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")]),a("mi",[s._v("d")]),a("mi",[s._v("h")]),a("mo",[s._v("=")]),a("mi",[s._v("log")]),a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[s._v("\\int_h\\log p(v)\\cdot q(h|v)dh=\\log p(v)\n")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"1.36em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"2.27225em","vertical-align":"-0.91225em"}}),a("span",{staticClass:"base displaystyle textstyle uncramped"},[a("span",{staticClass:"mop"},[a("span",{staticClass:"op-symbol large-op mop",staticStyle:{"margin-right":"0.44445em",top:"-0.0011249999999999316em"}},[s._v("∫")]),a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.91225em","margin-right":"0.05em","margin-left":"-0.44445em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle scriptstyle cramped"},[a("span",{staticClass:"mord mathit"},[s._v("h")])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mbin"},[s._v("⋅")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mord mathit"},[s._v("d")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mrel"},[s._v("=")]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])])])]),s._v(" "),a("p",[s._v("右边积分有：")]),s._v(" "),a("p",[a("span",{staticClass:"katex-display"},[a("span",{staticClass:"katex"},[a("span",{staticClass:"katex-mathml"},[a("math",[a("semantics",[a("mrow",[a("msub",[a("mrow",[a("mi",{attrs:{mathvariant:"double-struck"}},[s._v("E")])],1),a("mrow",[a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1)],1),a("mo",[s._v("[")]),a("mi",[s._v("log")]),a("mfrac",[a("mrow",[a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",{attrs:{separator:"true"}},[s._v(",")]),a("mi",[s._v("h")]),a("mo",[s._v(")")])],1),a("mrow",[a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1)],1),a("mo",[s._v("]")]),a("mo",[s._v("+")]),a("mi",[s._v("K")]),a("mi",[s._v("L")]),a("mo",[s._v("(")]),a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")]),a("mo",[s._v(")")]),a("mo",[s._v("=")]),a("msub",[a("mrow",[a("mi",{attrs:{mathvariant:"double-struck"}},[s._v("E")])],1),a("mrow",[a("mi",[s._v("q")]),a("mo",[s._v("(")]),a("mi",[s._v("h")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("v")]),a("mo",[s._v(")")])],1)],1),a("mo",[s._v("[")]),a("mi",[s._v("log")]),a("mi",[s._v("p")]),a("mo",[s._v("(")]),a("mi",[s._v("v")]),a("mo",{attrs:{separator:"true"}},[s._v(",")]),a("mi",[s._v("h")]),a("mo",[s._v(")")]),a("mo",[s._v("]")]),a("mo",[s._v("+")]),a("mi",[s._v("H")]),a("mo",[s._v("(")]),a("mi",[s._v("q")]),a("mo",[s._v(")")]),a("mo",[s._v("+")]),a("mi",[s._v("K")]),a("mi",[s._v("L")]),a("mo",[s._v("(")]),a("mi",[s._v("q")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",{attrs:{mathvariant:"normal"}},[s._v("∣")]),a("mi",[s._v("p")]),a("mo",[s._v(")")])],1),a("annotation",{attrs:{encoding:"application/x-tex"}},[s._v("\\mathbb{E}_{q(h|v)}[\\log\\frac{p(v,h)}{q(h|v)}]+KL(q(h|v)||p(h|v))=\\mathbb{E}_{q(h|v)}[\\log p(v,h)]+H(q)+KL(q||p)\n")])],1)],1)],1),a("span",{staticClass:"katex-html",attrs:{"aria-hidden":"true"}},[a("span",{staticClass:"strut",staticStyle:{height:"1.427em"}}),a("span",{staticClass:"strut bottom",staticStyle:{height:"2.363em","vertical-align":"-0.936em"}}),a("span",{staticClass:"base displaystyle textstyle uncramped"},[a("span",{},[a("span",{staticClass:"mord displaystyle textstyle uncramped"},[a("span",{staticClass:"mord mathbb"},[s._v("E")])]),a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.18019999999999992em","margin-right":"0.05em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle scriptstyle cramped"},[a("span",{staticClass:"mord scriptstyle cramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"mopen"},[s._v("[")]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord reset-textstyle displaystyle textstyle uncramped"},[a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"}),a("span",{staticClass:"mfrac"},[a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.686em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle cramped"},[a("span",{staticClass:"mord textstyle cramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticStyle:{top:"-0.2300000000000001em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped frac-line"})]),a("span",{staticStyle:{top:"-0.677em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle textstyle uncramped"},[a("span",{staticClass:"mord textstyle uncramped"},[a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mpunct"},[s._v(",")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"sizing reset-size5 size5 reset-textstyle textstyle uncramped nulldelimiter"})]),a("span",{staticClass:"mclose"},[s._v("]")]),a("span",{staticClass:"mbin"},[s._v("+")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.07153em"}},[s._v("K")]),a("span",{staticClass:"mord mathit"},[s._v("L")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mrel"},[s._v("=")]),a("span",{},[a("span",{staticClass:"mord displaystyle textstyle uncramped"},[a("span",{staticClass:"mord mathbb"},[s._v("E")])]),a("span",{staticClass:"vlist"},[a("span",{staticStyle:{top:"0.18019999999999992em","margin-right":"0.05em"}},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),a("span",{staticClass:"reset-textstyle scriptstyle cramped"},[a("span",{staticClass:"mord scriptstyle cramped"},[a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mclose"},[s._v(")")])])])]),a("span",{staticClass:"baseline-fix"},[a("span",{staticClass:"fontsize-ensurer reset-size5 size5"},[a("span",{staticStyle:{"font-size":"0em"}},[s._v("​")])]),s._v("​")])])]),a("span",{staticClass:"mopen"},[s._v("[")]),a("span",{staticClass:"mop"},[s._v("lo"),a("span",{staticStyle:{"margin-right":"0.01389em"}},[s._v("g")])]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("v")]),a("span",{staticClass:"mpunct"},[s._v(",")]),a("span",{staticClass:"mord mathit"},[s._v("h")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mclose"},[s._v("]")]),a("span",{staticClass:"mbin"},[s._v("+")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.08125em"}},[s._v("H")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mclose"},[s._v(")")]),a("span",{staticClass:"mbin"},[s._v("+")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.07153em"}},[s._v("K")]),a("span",{staticClass:"mord mathit"},[s._v("L")]),a("span",{staticClass:"mopen"},[s._v("(")]),a("span",{staticClass:"mord mathit",staticStyle:{"margin-right":"0.03588em"}},[s._v("q")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathrm"},[s._v("∣")]),a("span",{staticClass:"mord mathit"},[s._v("p")]),a("span",{staticClass:"mclose"},[s._v(")")])])])])])]),s._v(" "),a("p",[s._v("其中前两项是 ELBO，于是这就变成一个优化 ELBO 的问题。")])])}),[],!1,null,null,null);t.default=e.exports}}]);