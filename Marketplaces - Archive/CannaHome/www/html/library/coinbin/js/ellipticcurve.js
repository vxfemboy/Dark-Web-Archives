!function(){var t=window.EllipticCurve=function(){};t.FieldElementFp=function(t,e){this.x=e,this.q=t},t.FieldElementFp.prototype.equals=function(t){return t==this||this.q.equals(t.q)&&this.x.equals(t.x)},t.FieldElementFp.prototype.toBigInteger=function(){return this.x},t.FieldElementFp.prototype.negate=function(){return new t.FieldElementFp(this.q,this.x.negate().mod(this.q))},t.FieldElementFp.prototype.add=function(e){return new t.FieldElementFp(this.q,this.x.add(e.toBigInteger()).mod(this.q))},t.FieldElementFp.prototype.subtract=function(e){return new t.FieldElementFp(this.q,this.x.subtract(e.toBigInteger()).mod(this.q))},t.FieldElementFp.prototype.multiply=function(e){return new t.FieldElementFp(this.q,this.x.multiply(e.toBigInteger()).mod(this.q))},t.FieldElementFp.prototype.square=function(){return new t.FieldElementFp(this.q,this.x.square().mod(this.q))},t.FieldElementFp.prototype.divide=function(e){return new t.FieldElementFp(this.q,this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q))},t.FieldElementFp.prototype.getByteLength=function(){return Math.floor((this.toBigInteger().bitLength()+7)/8)},t.FieldElementFp.prototype.sqrt=function(){if(!this.q.testBit(0))throw new Error("even value of q");if(this.q.testBit(1)){var e=new t.FieldElementFp(this.q,this.x.modPow(this.q.shiftRight(2).add(BigInteger.ONE),this.q));return e.square().equals(this)?e:null}var i=this.q.subtract(BigInteger.ONE),r=i.shiftRight(1);if(!this.x.modPow(r,this.q).equals(BigInteger.ONE))return null;var n,s,u=i.shiftRight(2).shiftLeft(1).add(BigInteger.ONE),o=this.x,l=o.shiftLeft(2).mod(this.q);do{var h,g=new SecureRandom;do{h=new BigInteger(this.q.bitLength(),g)}while(h.compareTo(this.q)>=0||!h.multiply(h).subtract(l).modPow(r,this.q).equals(i));var p=t.FieldElementFp.fastLucasSequence(this.q,h,o,u);if(n=p[0],(s=p[1]).multiply(s).mod(this.q).equals(l))return s.testBit(0)&&(s=s.add(this.q)),s=s.shiftRight(1),new t.FieldElementFp(this.q,s)}while(n.equals(BigInteger.ONE)||n.equals(i));return null},t.FieldElementFp.fastLucasSequence=function(t,e,i,r){for(var n=r.bitLength(),s=r.getLowestSetBit(),u=BigInteger.ONE,o=BigInteger.TWO,l=e,h=BigInteger.ONE,g=BigInteger.ONE,p=n-1;p>=s+1;--p)h=h.multiply(g).mod(t),r.testBit(p)?(g=h.multiply(i).mod(t),u=u.multiply(l).mod(t),o=l.multiply(o).subtract(e.multiply(h)).mod(t),l=l.multiply(l).subtract(g.shiftLeft(1)).mod(t)):(g=h,u=u.multiply(o).subtract(h).mod(t),l=l.multiply(o).subtract(e.multiply(h)).mod(t),o=o.multiply(o).subtract(h.shiftLeft(1)).mod(t));g=(h=h.multiply(g).mod(t)).multiply(i).mod(t),u=u.multiply(o).subtract(h).mod(t),o=l.multiply(o).subtract(e.multiply(h)).mod(t),h=h.multiply(g).mod(t);for(p=1;p<=s;++p)u=u.multiply(o).mod(t),o=o.multiply(o).subtract(h.shiftLeft(1)).mod(t),h=h.multiply(h).mod(t);return[u,o]},t.PointFp=function(t,e,i,r,n){this.curve=t,this.x=e,this.y=i,this.z=null==r?BigInteger.ONE:r,this.zinv=null,this.compressed=!!n},t.PointFp.prototype.getX=function(){null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q));var t=this.x.toBigInteger().multiply(this.zinv);return this.curve.reduce(t),this.curve.fromBigInteger(t)},t.PointFp.prototype.getY=function(){null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q));var t=this.y.toBigInteger().multiply(this.zinv);return this.curve.reduce(t),this.curve.fromBigInteger(t)},t.PointFp.prototype.equals=function(t){return t==this||(this.isInfinity()?t.isInfinity():t.isInfinity()?this.isInfinity():!!t.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(BigInteger.ZERO)&&t.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(t.z)).mod(this.curve.q).equals(BigInteger.ZERO))},t.PointFp.prototype.isInfinity=function(){return null==this.x&&null==this.y||this.z.equals(BigInteger.ZERO)&&!this.y.toBigInteger().equals(BigInteger.ZERO)},t.PointFp.prototype.negate=function(){return new t.PointFp(this.curve,this.x,this.y.negate(),this.z)},t.PointFp.prototype.add=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var i=e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q),r=e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q);if(BigInteger.ZERO.equals(r))return BigInteger.ZERO.equals(i)?this.twice():this.curve.getInfinity();var n=new BigInteger("3"),s=this.x.toBigInteger(),u=this.y.toBigInteger(),o=(e.x.toBigInteger(),e.y.toBigInteger(),r.square()),l=o.multiply(r),h=s.multiply(o),g=i.square().multiply(this.z),p=g.subtract(h.shiftLeft(1)).multiply(e.z).subtract(l).multiply(r).mod(this.curve.q),a=h.multiply(n).multiply(i).subtract(u.multiply(l)).subtract(g.multiply(i)).multiply(e.z).add(i.multiply(l)).mod(this.curve.q),m=l.multiply(this.z).multiply(e.z).mod(this.curve.q);return new t.PointFp(this.curve,this.curve.fromBigInteger(p),this.curve.fromBigInteger(a),m)},t.PointFp.prototype.twice=function(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var e=new BigInteger("3"),i=this.x.toBigInteger(),r=this.y.toBigInteger(),n=r.multiply(this.z),s=n.multiply(r).mod(this.curve.q),u=this.curve.a.toBigInteger(),o=i.square().multiply(e);BigInteger.ZERO.equals(u)||(o=o.add(this.z.square().multiply(u)));var l=(o=o.mod(this.curve.q)).square().subtract(i.shiftLeft(3).multiply(s)).shiftLeft(1).multiply(n).mod(this.curve.q),h=o.multiply(e).multiply(i).subtract(s.shiftLeft(1)).shiftLeft(2).multiply(s).subtract(o.square().multiply(o)).mod(this.curve.q),g=n.square().multiply(n).shiftLeft(3).mod(this.curve.q);return new t.PointFp(this.curve,this.curve.fromBigInteger(l),this.curve.fromBigInteger(h),g)},t.PointFp.prototype.multiply=function(t){if(this.isInfinity())return this;if(0==t.signum())return this.curve.getInfinity();var e,i=t,r=i.multiply(new BigInteger("3")),n=this.negate(),s=this;for(e=r.bitLength()-2;e>0;--e){s=s.twice();var u=r.testBit(e);u!=i.testBit(e)&&(s=s.add(u?this:n))}return s},t.PointFp.prototype.multiplyTwo=function(t,e,i){var r;r=t.bitLength()>i.bitLength()?t.bitLength()-1:i.bitLength()-1;for(var n=this.curve.getInfinity(),s=this.add(e);r>=0;)n=n.twice(),t.testBit(r)?n=i.testBit(r)?n.add(s):n.add(this):i.testBit(r)&&(n=n.add(e)),--r;return n},t.PointFp.prototype.getEncoded=function(e){var i=this.getX().toBigInteger(),r=this.getY().toBigInteger(),n=t.integerToBytes(i,32);return e?r.isEven()?n.unshift(2):n.unshift(3):(n.unshift(4),n=n.concat(t.integerToBytes(r,32))),n},t.PointFp.decodeFrom=function(e,i){i[0];var r=i.length-1,n=i.slice(1,1+r/2),s=i.slice(1+r/2,1+r);n.unshift(0),s.unshift(0);var u=new BigInteger(n),o=new BigInteger(s);return new t.PointFp(e,e.fromBigInteger(u),e.fromBigInteger(o))},t.PointFp.prototype.add2D=function(e){if(this.isInfinity())return e;if(e.isInfinity())return this;if(this.x.equals(e.x))return this.y.equals(e.y)?this.twice():this.curve.getInfinity();var i=e.x.subtract(this.x),r=e.y.subtract(this.y).divide(i),n=r.square().subtract(this.x).subtract(e.x),s=r.multiply(this.x.subtract(n)).subtract(this.y);return new t.PointFp(this.curve,n,s)},t.PointFp.prototype.twice2D=function(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var e=this.curve.fromBigInteger(BigInteger.valueOf(2)),i=this.curve.fromBigInteger(BigInteger.valueOf(3)),r=this.x.square().multiply(i).add(this.curve.a).divide(this.y.multiply(e)),n=r.square().subtract(this.x.multiply(e)),s=r.multiply(this.x.subtract(n)).subtract(this.y);return new t.PointFp(this.curve,n,s)},t.PointFp.prototype.multiply2D=function(t){if(this.isInfinity())return this;if(0==t.signum())return this.curve.getInfinity();var e,i=t,r=i.multiply(new BigInteger("3")),n=this.negate(),s=this;for(e=r.bitLength()-2;e>0;--e){s=s.twice();var u=r.testBit(e);u!=i.testBit(e)&&(s=s.add2D(u?this:n))}return s},t.PointFp.prototype.isOnCurve=function(){var t=this.getX().toBigInteger(),e=this.getY().toBigInteger(),i=this.curve.getA().toBigInteger(),r=this.curve.getB().toBigInteger(),n=this.curve.getQ(),s=e.multiply(e).mod(n),u=t.multiply(t).multiply(t).add(i.multiply(t)).add(r).mod(n);return s.equals(u)},t.PointFp.prototype.toString=function(){return"("+this.getX().toBigInteger().toString()+","+this.getY().toBigInteger().toString()+")"},t.PointFp.prototype.validate=function(){var t=this.curve.getQ();if(this.isInfinity())throw new Error("Point is at infinity.");var e=this.getX().toBigInteger(),i=this.getY().toBigInteger();if(e.compareTo(BigInteger.ONE)<0||e.compareTo(t.subtract(BigInteger.ONE))>0)throw new Error("x coordinate out of bounds");if(i.compareTo(BigInteger.ONE)<0||i.compareTo(t.subtract(BigInteger.ONE))>0)throw new Error("y coordinate out of bounds");if(!this.isOnCurve())throw new Error("Point is not on the curve.");if(this.multiply(t).isInfinity())throw new Error("Point is not a scalar multiple of G.");return!0},t.CurveFp=function(e,i,r){this.q=e,this.a=this.fromBigInteger(i),this.b=this.fromBigInteger(r),this.infinity=new t.PointFp(this,null,null),this.reducer=new Barrett(this.q)},t.CurveFp.prototype.getQ=function(){return this.q},t.CurveFp.prototype.getA=function(){return this.a},t.CurveFp.prototype.getB=function(){return this.b},t.CurveFp.prototype.equals=function(t){return t==this||this.q.equals(t.q)&&this.a.equals(t.a)&&this.b.equals(t.b)},t.CurveFp.prototype.getInfinity=function(){return this.infinity},t.CurveFp.prototype.fromBigInteger=function(e){return new t.FieldElementFp(this.q,e)},t.CurveFp.prototype.reduce=function(t){this.reducer.reduce(t)},t.CurveFp.prototype.decodePointHex=function(e){var i=parseInt(e.substr(0,2),16);switch(i){case 0:return this.infinity;case 2:case 3:var r=1&i,n=e.substr(2,e.length-2),s=new BigInteger(n,16);return this.decompressPoint(r,s);case 4:case 6:case 7:var u=(e.length-2)/2,o=(n=e.substr(2,u),e.substr(u+2,u));return new t.PointFp(this,this.fromBigInteger(new BigInteger(n,16)),this.fromBigInteger(new BigInteger(o,16)));default:return null}},t.CurveFp.prototype.encodePointHex=function(t){if(t.isInfinity())return"00";var e=t.getX().toBigInteger().toString(16),i=t.getY().toBigInteger().toString(16),r=this.getQ().toString(16).length;for(r%2!=0&&r++;e.length<r;)e="0"+e;for(;i.length<r;)i="0"+i;return"04"+e+i},t.CurveFp.prototype.decompressPoint=function(e,i){var r=this.fromBigInteger(i),n=r.multiply(r.square().add(this.getA())).add(this.getB()).sqrt();if(null==n)throw new Error("Invalid point compression");var s=n.toBigInteger();return(s.testBit(0)?1:0)!=e&&(n=this.fromBigInteger(this.getQ().subtract(s))),new t.PointFp(this,r,n,null,!0)},t.fromHex=function(t){return new BigInteger(t,16)},t.integerToBytes=function(t,e){var i=t.toByteArrayUnsigned();if(e<i.length)i=i.slice(i.length-e);else for(;e>i.length;)i.unshift(0);return i},t.X9Parameters=function(t,e,i,r){this.curve=t,this.g=e,this.n=i,this.h=r},t.X9Parameters.prototype.getCurve=function(){return this.curve},t.X9Parameters.prototype.getG=function(){return this.g},t.X9Parameters.prototype.getN=function(){return this.n},t.X9Parameters.prototype.getH=function(){return this.h},t.secNamedCurves={secp256k1:function(){var e=t.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F"),i=BigInteger.ZERO,r=t.fromHex("7"),n=t.fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"),s=BigInteger.ONE,u=new t.CurveFp(e,i,r),o=u.decodePointHex("0479BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8");return new t.X9Parameters(u,o,n,s)}},t.getSECCurveByName=function(e){return null==t.secNamedCurves[e]?null:t.secNamedCurves[e]()}}();