function testTest(){
    //On récupère le code hexadécimale de la couleur
    var chexa = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);}),
        //Si le code contient un #, on l'enlève
        hexa = chexa.replace('#',''),
        //On récupère la partie hexadécimale qui gère le rouge
        hexred = hexa.substring(0,2),
        //On récupère la partie hexadécimale qui gère le vert
        hexgreen = hexa.substring(2,4),
        //On récupère la partie hexadécimale qui gère le bleu
        hexblue = hexa.substring(4,6),
        //On transforme la partie hexadécimale qui gère le rouge en valeur numérique (RGB)
        red = parseInt(hexred,16),
        //On transforme la partie hexadécimale qui gère le vert en valeur numérique (RGB)
        green = parseInt(hexgreen,16),
        //On transforme la partie hexadécimale qui gère le bleu en valeur numérique (RGB)
        blue = parseInt(hexblue,16),
        //On calcule le pourcentage de rouge de la couleur
        redpour = (red * 100)/255,
        //On calcule le pourcentage de vert de la couleur
        greenpour = (green * 100)/255,
        //On calcule le pourcentage de bleu de la couleur
        bluepour = (blue * 100)/255,
        //Variable qui contient une valeur entre 0 et 1 représentant le rouge
        r = red/255,
        //Variable qui contient une valeur entre 0 et 1 représentant le vert
        g = green/255,
        //Variable qui contient une valeur entre 0 et 1 représentant le bleu
        b = blue/255,
        //Variable utile aux calculs qui suivront (on réupère la plus grosse valeur RGB)
        max = Math.max(r,g,b),
        //Idem, mais en récupérant la plus petite valeure
        min = Math.min(r,g,b),
        //Variable qui servira aux calculs suivant, cf. Wikipédia hein
        delta = max - min,
        //On créé les variables qui serviront plus tard à la teinte/saturation/luminosité
        h, s, l = (max + min) /2,
        hexapp = ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

    
    
    
    
    
    //On récupère la valeur entrée par l'utilisateur
    function recup(){
            var hexa = document.getElementById("surface").value;
        }
    
    
    //Et hop là, on transfore nos valeurs RGB en une TSL
    if (max == min){
        h = s = l = 0; //Achrome
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    //On transpose la teinte sur un cercle (cf. cercle chromatique)
    var teinte = (h*360),
        //On affiche la saturation avec un chiffre après la virgule
        saturation = (s*100).toFixed(1),
        //On affiche la luminosité avec un chiffre après la virgule
        luminosite = (l*100).toFixed(1),
        //Et on appelle la teinte complémentaire, qui se trouve à l'opposé de la teinte choisie par l'utilisateur, sur le cercle chromatique
        teintecompl = teinte + 180 ;
    
    //Hors, si la teinte complémentaire est supérieure à 360°, on lui retire 360° pour la faire repartir sur le cercle, dans le sens choisi
    if (teintecompl > 360){
        teintecompl = teintecompl - 360;
    }
    
    
    //On affiche la couleur choisie par l'utilisateur avec les données colorimétrique
    $("#try").html('<div id="mmdr"><p>Code hexa : '+chexa+'</p><br><p>Code RGB : '+red+' '+green+' '+blue+'</p><br><p>Code TSL : '+teinte+' '+saturation+' '+luminosite+'</p><br></div>');
    $("#mdr>p").css("margin", "25px");
    $("#mmdr").css("width", "250px");
    $("#mmdr").css("height", "250px");
    $("#mmdr").css("background-color", chexa);
      
    
    
    var hcm = teintecompl/100,
        scm = saturation/100,
        lcm = luminosite/100;
    
    
    

    if ((red == green) && (green == blue)){
        var gris = redpour;
    }
    
    
    function calculPourcentage(){
        $("body").append('<div id="mdr"></div>');
        $("#mdr").css("width", "250px");
        $("#mdr").css("height", "250px");
        $("#mdr").css("background-color", chexa);
    }
    
    
    
    
    //Variable identiques à celles du début, mais pour la complémentaire
    var hexaCompl = "800040",
        chexaCompl = "#" + hexaCompl,
        hexredCompl = hexaCompl.substring(0,2),
        hexgreenCompl = hexaCompl.substring(2,4),
        hexblueCompl = hexaCompl.substring(4,6),
        redCompl = parseInt(hexredCompl,16),
        greenCompl = parseInt(hexgreenCompl,16),
        blueCompl = parseInt(hexblueCompl,16);
    
    
    
    
    //On passe finalement d'une TSL complémentaire à un RGB complémentaire
    var h = ((6*teintecompl)/360);
    function hsl2rgb (h, s, l) {

    var r, g, b, m, c, x;
    
    if (h < 0){
        h = 6 - (-h % 6);
    }
    h %= 6;
    s = Math.max(0, Math.min(1, s / 100));
    l = Math.max(0, Math.min(1, l / 100));
    c = (1 - Math.abs((2 * l) - 1)) * s;
    x = c * (1 - Math.abs((h % 2) - 1));
         
    if (0 < h < 1) {
        r = c;
        g = x;
        b = 0;
    } else if (1 < h < 2) {
        r = x;
        g = c;
        b = 0;
    } else if (2 < h < 3) {
        r = 0;
        g = c;
        b = x;
    } else if (3 < h < 4) {
        r = 0;
        g = x;
        b = c;
    } else if (4 < h < 5) {
        r = x;
        g = 0;
        b = c;
    } else if (5 < h < 6){
        r = c;
        g = 0;
        b = x;
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    return { r: r, g: g, b: b }

}
    
    hsl2rgb(teintecompl, saturation, luminosite);
    
    //On récupère les valeurs RGB contenues dans l'objet hsl2rgb
    var r2 = hsl2rgb(h, saturation, luminosite).r,
        g2 = hsl2rgb(h, saturation, luminosite).g,
        b2 = hsl2rgb(h, saturation, luminosite).b;
    
    
    
    
    
    
    
    
    
    
    //Vérifications et ajustements au cas par cas
    
    //RED
    if (((red > green)&&(red > blue))&&(blue > green)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            b2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    //VALIDE
    if (((red > green)&&(red > blue))&&(green > blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).r,
            b2 = hsl2rgb(h, saturation, luminosite).g;
            b2 = hsl2rgb(h, saturation, luminosite).g;
    }
    
    if (((red > green)&&(red > blue))&&(green == blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if ((red > green)&&(red == blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).g;
    }
    
    if ((red > green)&&(red == green)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if ((red > blue)&&(red == green)){
        var g2 = hsl2rgb(h, saturation, luminosite).b,
            b2 = hsl2rgb(h, saturation, luminosite).g;
    }
    
    if ((red == green)&&(red == blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if (((red > blue)||(red > green))&&(green == blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).r,
            b2 = hsl2rgb(h, saturation, luminosite).r;
    }
    //FIN RED
    
    
    //GREEN
    if (((green > red)&&(green > blue))&&(red > blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).r,
            g2 = hsl2rgb(h, saturation, luminosite).b,
            b2 = hsl2rgb(h, saturation, luminosite).g;
    }
    
    if (((green > red)&&(green > blue))&&(blue > red)){
        var r2 = hsl2rgb(h, saturation, luminosite).g,
            g2 = hsl2rgb(h, saturation, luminosite).b,
            b2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if (((green > red)&&(green > blue))&&(blue == red)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if ((green > red)&&(green == red)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if ((green > red)&&(green == blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).r,
            g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }

    
    if ((green == red)&&(green == blue)){
        var r2 = hsl2rgb(h, saturation, luminosite).b,
            g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).r;
    }
    
    if (((green> blue)||(green > red))&&(red == blue)){
        var g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }
    //FIN GREEN
    
    
    //BLUE
    if (((blue > red)&&(blue > green))&&(red > green)){
        var r2 = hsl2rgb(h, saturation, luminosite).r,
            g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }

    if (((blue > red)&&(blue > green))&&(green > red)){
        var r2 = hsl2rgb(h, saturation, luminosite).g,
            g2 = hsl2rgb(h, saturation, luminosite).r,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }

    if (((blue > red)&&(blue > green))&&(green == red)){
        var r2 = hsl2rgb(h, saturation, luminosite).g,
            g2 = hsl2rgb(h, saturation, luminosite).r,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }

    if ((blue > red)&&(blue == green)){
        var r2 = hsl2rgb(h, saturation, luminosite).r,
            g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }

    if ((blue > red)&&(blue == red)){
        var r2 = hsl2rgb(h, saturation, luminosite).g,
            g2 = hsl2rgb(h, saturation, luminosite).r,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }

    if ((blue == green)&&(blue == red)){
        var r2 = hsl2rgb(h, saturation, luminosite).g,
            g2 = hsl2rgb(h, saturation, luminosite).r,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }
    
    if (((blue > green)||(blue > red))&&(red == green)){
        var g2 = hsl2rgb(h, saturation, luminosite).g,
            b2 = hsl2rgb(h, saturation, luminosite).b;
    }
    //FIN BLUE
    
    
    if ((red == green)&&(green == blue)){
        var r2 = red,
            g2 = green,
            b2 = blue;
    }
    
    //On transforme une valeure numérique en valeur hexadécimale
    function cot(c){
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    //Et on transforme enfin notre valeure RGB complémentaire et valeur hexadécimale
    function rgbtohex(r, g, b){
        return "#" + cot(r) + cot(g) + cot(b);
    }
    
    var popo = rgbtohex(r2, g2, b2);
    
    $("body").append('<div id="maismdr"></div>');
    $("#maismdr").css("width", "250px");
    $("#maismdr").css("height", "250px");
    $("#maismdr").css("background-color", rgbtohex(r2,g2,b2));
    
    $("title").html(' ' + rgbtohex(r2,g2,b2));
    
    var test = [hexa, popo];
    
    return test;
    
}
