function scrollToTarget(target) {
    console.log(target);
    const target = document.getElementById(target);
    target.scrollIntoView({ behavior: 'smooth' });
}