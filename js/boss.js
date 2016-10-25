function showBoss() {
    // If boss invisible, animate to show
    if (!bossVisible) {
        bossVisible = true;
        $("#boss").animate({left: "+=200"}, 200);
    }
}
function hideBoss() {
    // if boss visible, animate to hide
    if (bossVisible) {
        bossVisible = false;
        $("#boss").animate({left: "-=200"}, 200);
    }
}
function toggleBoss() {
    if (bossVisible) {
        hideBoss();
    }
    else {
        showBoss();
    }
}