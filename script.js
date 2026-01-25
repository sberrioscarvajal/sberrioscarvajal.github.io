// Initialize Icons on load
lucide.createIcons();

async function openTab(evt, tabName) {
    // 1. UI Updates (Tabs styling)
    var i, tabcontent, tablinks;
    
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
        tablinks[i].style.borderColor = "transparent";
        tablinks[i].style.color = "#64748b"; 
    }

    // 2. Fetch Content if it's empty
    const contentContainer = document.getElementById(tabName);
    
    if (contentContainer.innerHTML.trim() === "") {
        try {
            // This fetches the file from the components folder
            const response = await fetch(`components/${tabName.toLowerCase()}.html`);
            if (!response.ok) throw new Error("Network response was not ok");
            const html = await response.text();
            contentContainer.innerHTML = html;
            
            // Re-initialize icons for the new content
            lucide.createIcons();
        } catch (error) {
            contentContainer.innerHTML = `<p class="text-red-500">Error loading content. Please try again.</p>`;
            console.error("Fetch error:", error);
        }
    }

    // 3. Show Content
    contentContainer.style.display = "block";
    setTimeout(() => contentContainer.classList.add("active"), 10);
    
    // 4. Update Button Style
    if (evt) {
        evt.currentTarget.classList.add("active");
        evt.currentTarget.style.borderColor = "#00205B"; 
        evt.currentTarget.style.color = "#00205B";       
    } else {
        // Handle direct linking (e.g. reload on Education tab)
        const btn = document.querySelector(`button[onclick="openTab(event, '${tabName}')"]`);
        if(btn) {
            btn.classList.add("active");
            btn.style.borderColor = "#00205B"; 
            btn.style.color = "#00205B";   
        }
    }
}

// Default to 'About' or URL Hash on load
document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash.replace('#', '') || 'About';
    openTab(null, hash);
});