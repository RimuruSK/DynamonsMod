document.getElementById("fileInput").addEventListener("change", function() {
    var fileLabel = document.getElementById("fileLabel");
    var fileName = this.files[0].name;
    fileLabel.innerText = "Selected: " + fileName;
});

function openModal() {
    var modal = document.getElementById("myModal");
    var modalContent = document.querySelector(".modal-content");
    modal.style.display = "flex";

    setTimeout(function() {
        modalContent.classList.add("active");
    }, 50);
}

function closeModal() {
    var modal = document.getElementById("myModal");
    var modalContent = document.querySelector(".modal-content");
    modalContent.classList.remove("active");

    setTimeout(function() {
        modal.style.display = "none";
    }, 300);
}

function applyEdits() {
    var fileInput = document.getElementById("fileInput");
    var findReplaceOptions = [
        {
            find: '"startingCoins":30',
            replace: '"startingCoins":999999999',
            checkboxId: 'option1'
        },
        {
            find: '"startingDust":200',
            replace: '"startingDust":999999999',
            checkboxId: 'option2'
        },
        {
            find: '[{"name":"discatch","amount":3},{"name":"dust","amount":250},{"name":"coins","amount":20}]',
            replace: '[{"name":"discatch","amount":1000000},{"name":"no_ads","amount":1},{"name":"4x_xp","amount":1}]',
            checkboxId: 'option3'
        },
        {
            find: '[{"type":"earth","id":"kikflick","level":2},{"type":"water","id":"snorky","level":2},{"type":"fire","id":"torchip","level":2}]',
            replace: '[{"type":"earth","id":"malakite","level":54},{"type":"water","id":"kobalt","level":54},{"type":"fire","id":"krimson","level":54}]',
            checkboxId: 'option4'
        },
        {
            find: '"enemy":{"id":"duckron","level":2}',
            replace: '"enemy":{"id":"zenix_egg","level":55}',
            checkboxId: 'option5'
        },
        {
            find: '"critFactor":1.5,"kindFactors":{"strong":1.2,"weak":0.8,"normal":1},"rageFactor":1.9,"lvlFactorThreshold":50,"extraByHurtThreshold":0.5,"extraDamageFactor":1.3,',
            replace: '"critFactor":5000,"kindFactors":{"strong":5000,"weak":5000,"normal":5000},"rageFactor":5000,"lvlFactorThreshold":50,"extraByHurtThreshold":0.5,"extraDamageFactor":5000,',
            checkboxId: 'option6'
        },
        {
            find: '"maxMonLevel":55',
            replace: '"maxMonLevel":100',
            checkboxId: 'option7'
        }
    ];

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            var fileContent = e.target.result;

            fileContent = atob(fileContent);

            findReplaceOptions.forEach(function(option) {
                if (document.getElementById(option.checkboxId).checked) {
                    var findPattern = new RegExp(escapeRegExp(option.find), 'g');
                    fileContent = fileContent.replace(findPattern, option.replace);
                }
            });

            fileContent = btoa(fileContent);

            var blob = new Blob([fileContent], { type: 'application/octet-stream' });

            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'modded.dat';
            link.click();

            closeModal();
        };

        reader.readAsText(file);
    } else {
        alert("Please select a file to process.");
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function openInfoModal() {
    var infoModal = document.getElementById("infoModal");
    var infoModalContent = document.querySelector(".info-modal-content");
    infoModal.style.display = "flex";

    setTimeout(function() {
        infoModalContent.classList.add("active");
    }, 50);
}

function closeInfoModal() {
    var infoModal = document.getElementById("infoModal");
    var infoModalContent = document.querySelector(".info-modal-content");
    infoModalContent.classList.remove("active");

    setTimeout(function() {
        infoModal.style.display = "none";
    }, 300);
}

function openLink() {
    window.open("https://www.youtube.com/channel/UCl4xWhatjSrmLQ4MjOf7VGA?sub_confirmation=1", "_blank");
}

document.addEventListener("DOMContentLoaded", function() {
    openInfoModal();
});

var guideContent = [
    "Export the gameplay.dat file from the game",
    "Click the 'Select File' button to select the exported file",
    "Click on the 'Features' button and select the features that need to be modified for your version of the game",
    "Click the 'Apply Mods' button to export the modified gameplay.dat file",
    "Replace the modified gameplay.dat file into the game and build",
];

var currentGuideStep = 0;

function openGuideModal() {
    var guideModal = document.getElementById("guideModal");
    var guideModalContent = document.querySelector(".guide-modal-content");
    guideModal.style.display = "flex";

    updateGuideStep();

    setTimeout(function() {
        guideModalContent.classList.add("active");
    }, 50);
}

function closeGuideModal() {
    var guideModal = document.getElementById("guideModal");
    var guideModalContent = document.querySelector(".guide-modal-content");
    guideModalContent.classList.remove("active");

    setTimeout(function() {
        guideModal.style.display = "none";
    }, 300);
}

function updateGuideStep() {
    var guideTitle = document.getElementById("guideTitle");
    var guideSteps = document.getElementById("guideSteps");
    guideTitle.innerText = "Step " + (currentGuideStep + 1);
    guideSteps.innerHTML = "<p>" + guideContent[currentGuideStep] + "</p>";
    updateGuideButtonsVisibility();
}

function prevGuideStep() {
    if (currentGuideStep > 0) {
        currentGuideStep--;
        updateGuideStep();
    }
}

function nextGuideStep() {
    if (currentGuideStep < guideContent.length - 1) {
        currentGuideStep++;
        updateGuideStep();
    }
}

function updateGuideButtonsVisibility() {
    var prevGuideButton = document.getElementById("prevGuideButton");
    var nextGuideButton = document.getElementById("nextGuideButton");

    prevGuideButton.style.display = currentGuideStep === 0 ? "none" : "block";
    nextGuideButton.style.display = currentGuideStep === guideContent.length - 1 ? "none" : "block";
}
