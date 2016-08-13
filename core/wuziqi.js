/**
 * Created by my on 2016/5/8.
 */
window.onload=function(){
    var _img=null;
    var _span=null;
    var _width=document.documentElement.clientWidth||document.body.clientWidth;
    var _height=document.documentElement.clientHeight || document.body.clientHeight;
    var _stage=document.getElementById("stage");
    var s_w=Math.floor(_width/40)*40;//计算棋盘宽度；
    var s_h=Math.floor(_height/40)*40;//计算棋盘高度；
    var _left=Math.floor((_width-s_w)/2);//落子时还用
    var _top=Math.floor((_height-s_h)/2);//落子时还用
    _stage.style.width=s_w+"px";
    _stage.style.height=s_h+"px";
    _stage.style.marginLeft=_left+"px";
    _stage.style.marginTop=_top+"px";

    var _piece={"white":[],"black":[]};//保存所有已经在棋盘上的所有棋子坐标

    function isWin(_cmd,x,y){
        var _h= 0,h_=0;//记录当前棋子水平方向，两边查找相同颜色的棋子个数
        var _v= 0,v_=0;//记录当前棋子垂直方向，两边查找相同颜色的棋子个数
        var _o= 0,o_=0;//记录当前棋子斜线方向，两边查找相同颜色的棋子个数
        var _r= 0,r_=0;//记录当前棋子反斜线方向，两边查找相同颜色的棋子个数
        var _key=_cmd==0?"white":"black";
        var _name=_cmd==0?"白方：":"黑方：";
        for(var n=1;n<5;n++){
            for(var i=0;i<_piece[_key].length;i++){
                //130+","+260;
                switch(_piece[_key][i][0]+","+_piece[_key][i][1]){
                    case (x-40*n)+","+y : (_h+1==n)?_h++:0;break;
                    case (x+40*n)+","+y:(h_+1==n)?h_++:0;break;
                    case x+","+(y-40*n):(_v+1==n)?_v++:0;break;
                    case x+","+(y+40*n):(v_+1==n)?v_++:0;break;
                    case (x-40*n)+","+(y-40*n):(_o+1==n)?_o++:0;break;
                    case (x+40*n)+","+(y+40*n):(o_+1==n)?o_++:0;break;
                    case (x+40*n)+","+(y-40*n):(_r+1==n)?_r++:0;break;
                    case (x-40*n)+","+(y+40*n):(r_+1==n)?r_++:0;break;
                }
                if(_h+h_>=4 || _v+v_>=4 || _o+o_>=4 || _r+r_>=4){
                    alert(_name+"赢!");
                    return;
                }
            }
        }
    }

    function checkPiece(e,_cmd){
        var x= Math.abs((e.clientX-_left)%40)<=20?Math.floor((e.clientX-_left)/40)*40-13:Math.ceil((e.clientX-_left)/40)*40-13;
        var y= Math.abs((e.clientY-_top)%40)<=20?Math.floor((e.clientY-_top)/40)*40-13:Math.ceil((e.clientY-_top)/40)*40-13;
        var _exist=0;//判断这个坐标上有无棋子0表示没有棋子，1表示已经存在
        for(var key in _piece){
            for(var i=0;i<_piece[key].length;i++){
                if(_piece[key][i][0]==x && _piece[key][i][1]==y) {
                    _exist=1;
                    break;
                }
            }
        }
        if(_exist==0){
            _img = document.createElement("img");
            if(_cmd>0){
                _piece["black"].push([x,y]);
                _img.src = "images/black.png";
            }else{
                _piece["white"].push([x,y]);
                _img.src = "images/white.png";
            }
            _span=document.createElement("span");
            _span.style.left = x + "px";
            _span.style.top = y + "px";
            _span.style.borderRadius="50%";
            _span.appendChild(_img);
            _stage.appendChild(_span);
            isWin(_cmd,x,y);//判断双方输赢
            return _cmd==0?1:0;
        }else{
            return _cmd;
        }
    }
    function boundEvent(){
        var _cmd=0;//0表示该下白棋，1表示黑棋；
        _stage.onclick=function(e){
            var e=e||window.event;
            _cmd=checkPiece(e,_cmd);
        }
    }
    boundEvent();
}
