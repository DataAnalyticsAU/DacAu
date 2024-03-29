document.addEventListener("DOMContentLoaded", function() {
    // D3 Graphs
    const body = d3.select("body");
    const svg = body.append("svg")
        .attr("class", "dynamic-graph")
        .attr("width", "100%")
        .attr("height", "100%");

    let scatterData = generateData(50);
    let pieData = [25, 25, 25, 25];
    let barData = generateData(10);
    let lineData = generateData(20);

    function generateData(count) {
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                x: Math.random() * 100,
                y: Math.random() * 100,
                value: Math.random() * 100,
                color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
            });
        }
        return data;
    }

    function updateGraphs() {
        scatterData.forEach(d => {
            d.x += (Math.random() - 0.5) * 10;
            d.y += (Math.random() - 0.5) * 10;
        });

        const scatterCircles = svg.selectAll(".scatter-circle")
            .data(scatterData);

        scatterCircles.enter()
            .append("circle")
            .attr("class", "scatter-circle")
            .attr("cx", d => d.x + "%")
            .attr("cy", d => d.y + "%")
            .attr("r", d => Math.sqrt(d.value) + "px")
            .attr("fill", d => d.color)
            .attr("opacity", 0.6);

        scatterCircles.transition()
            .duration(2000)
            .attr("cx", d => d.x + "%")
            .attr("cy", d => d.y + "%")
            .attr("r", d => Math.sqrt(d.value) + "px")
            .attr("fill", d => d.color);

        scatterCircles.exit().remove();

        pieData = [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100];

        const pie = d3.pie();
        const pieArcs = pie(pieData);

        const pieArc = d3.arc()
            .innerRadius(0)
            .outerRadius(100);

        svg.selectAll(".pie-slice").remove();

        svg.selectAll(".pie-slice")
            .data(pieArcs)
            .enter()
            .append("path")
            .attr("class", "pie-slice")
            .attr("d", pieArc)
            .attr("fill", d => `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`)
            .attr("transform", d => `translate(${Math.random() * 100}%, ${Math.random() * 100}%)`);

        const bars = svg.selectAll(".bar")
            .data(barData);

        bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => (Math.random() * 100) + "%")
            .attr("y", d => (Math.random() * 100) + "%")
            .attr("width", "5%")
            .attr("height", d => d.value + "%")
            .attr("fill", d => d.color)
            .attr("opacity", 0.6);

        bars.transition()
            .duration(2000)
            .attr("x", (d, i) => (Math.random() * 100) + "%")
            .attr("y", d => (Math.random() * 100) + "%")
            .attr("height", d => d.value + "%")
            .attr("fill", d => d.color);

        bars.exit().remove();

        lineData.forEach(d => {
            d.y += (Math.random() - 0.5) * 10;
        });

        const line = d3.line()
            .x(d => d.x + "%")
            .y(d => d.y + "%")
            .curve(d3.curveBasis);

        svg.selectAll(".line-path").remove();

        svg.append("path")
            .datum(lineData)
            .attr("class", "line-path")
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line);

// Dynamic Curvedness for Navigation
const navItems = document.querySelectorAll('.nav-list-custom li a');

navItems.forEach(item => {
    item.addEventListener('click', function() {
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        this.classList.add('active');
    });
});
    }

    setInterval(updateGraphs, 2000);

    // Section Active Class
    let sections = document.querySelectorAll('section');

    function checkViewport() {
        let windowHeight = window.innerHeight;
        let sectionHeight;

        sections.forEach(section => {
            let bounding = section.getBoundingClientRect();

            // Calculate section height
            sectionHeight = bounding.bottom - bounding.top;

            if (
                bounding.top <= windowHeight * 0.6 && // Top of the section is visible at least 30% from the top
                bounding.bottom >= windowHeight * 0.4 // Bottom of the section is visible at least 70% from the top
            ) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });
    }

    window.addEventListener('scroll', checkViewport);
    window.addEventListener('resize', checkViewport);

    // Navigation Menu Toggle
    function toggleMenu() {
        const navDropdown = document.getElementById('navDropdown');
        if (navDropdown.style.display === 'block') {
            navDropdown.style.display = 'none';
        } else {
            navDropdown.style.display = 'block';
        }
    }

    // Dropdown Toggle
    function toggleDropdown(event) {
        event.stopPropagation();
        const dropdownItem = event.currentTarget;
        dropdownItem.classList.toggle("active");
    }

    document.addEventListener("click", function(event) {
        const dropdowns = document.querySelectorAll(".dropdown-item");
        dropdowns.forEach(function(dropdown) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("active");
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll('.nav-list-custom li a');
    const navbar = document.querySelector('.navbar-mobile-custom');

    const borderRadiusMap = {
        'home': '5% 0% 0% 95%',
        'About_Us': '20% 0% 0% 80%',
        'Faculty Co-ordinators': '35% 0% 0% 65%',
        'Sr-Team': '50% 0% 0% 50%', 
        'Collaborations': '65% 0% 0% 35%', 
        'Previous Events': '80% 0% 0% 23%', 
        'contact-links': '95% 0% 0% 18%'
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            navItems.forEach(item => {
                item.classList.remove('active');
                item.style.transform = 'scale(1)';
            });

            this.classList.add('active');
            this.style.transform = 'scale(1.3)';
            
            // Apply transition effect to the scale
            setTimeout(() => {
                this.style.transition = 'transform 0.3s ease-out';
            }, 50);

            const sectionId = this.getAttribute('href').replace('#', '');
            
            if (borderRadiusMap.hasOwnProperty(sectionId)) {
                const borderRadiusValue = borderRadiusMap[sectionId];
                
                // Apply transition effect to the borderRadius and background color
                navbar.style.transition = 'border-radius 0.5s ease, background-color 0.5s ease';
                navbar.style.borderRadius = borderRadiusValue;
                
                // Change background color for emphasis
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                
                // Reset background color after delay for dramatic effect
                setTimeout(() => {
                    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                }, 500);
            }

            // Redirect to the corresponding section
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
