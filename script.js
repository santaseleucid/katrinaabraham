console.log('Hello, World!');
function scrollToTarget(targetId) {
    console.log(targetId);
    const target = document.getElementById(targetId);
    target.scrollIntoView({ behavior: 'smooth' });
}