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
            replace: '[{"type":"earth","id":"cybeenyx","level":54},{"type":"water","id":"infinissy","level":54},{"type":"fire","id":"fierodor","level":54}]',
            checkboxId: 'option4'
        },
        {
            find: '"enemy":{"id":"duckron","level":2}',
            replace: '"enemy":{"id":"goldonyx","level":55}',
            checkboxId: 'option5'
        },
        {
            find: '"critFactor":1.5,"kindFactors":{"strong":1.2,"weak":0.8,"normal":1},"rageFactor":1.9,"lvlFactorThreshold":50,"extraByHurtThreshold":0.5,"extraDamageFactor":1.3,',
            replace: '"critFactor":100,"kindFactors":{"strong":100,"weak":100,"normal":100},"rageFactor":100,"lvlFactorThreshold":50,"extraByHurtThreshold":0.5,"extraDamageFactor":100,',
            checkboxId: 'option6'
        },
        {
            find: '"startingItems":[]',
            replace: '"startingItems":[{"name":"mon#fire_egg#55"},{"name":"mon#dark_egg_2#55"},{"name":"mon#malakite_egg#55"},{"name":"mon#kobalt_egg#55"},{"name":"mon#electric_egg#55"}]',
            checkboxId: 'option7'
        },
        {
            find: '"maxHP":100',
            replace: '"maxHP":10000',
            checkboxId: 'option8'
        },
        {
            find: '"maxMonLevel":55',
            replace: '"maxMonLevel":20000',
            checkboxId: 'option9'
        },
        {
            find: '[{"type":"earth","id":"kikflick","level":2},{"type":"water","id":"snorky","level":2},{"type":"fire","id":"torchip","level":2}]',
            replace: '[{"type":"earth","id":"cybeenyx","level":19999},{"type":"water","id":"infinissy","level":19999},{"type":"fire","id":"fierodor","level":19999}]',
            checkboxId: 'option10'
        },
        {
            find: '"enemy":{"id":"duckron","level":2}',
            replace: '"enemy":{"id":"goldonyx","level":20000}',
            checkboxId: 'option11'
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
