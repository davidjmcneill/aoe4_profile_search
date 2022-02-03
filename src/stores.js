import { writable } from 'svelte/store';

export const search_id = writable("6935410");

export const user_name = writable("");

export const fetch_status = writable("");

export const match_type = writable([
    {
        "leaderboard": {
            0: "Custom",
            17: "1v1",
            18: "2v2",
            19: "3v3",
            20: "4v4"
        },
        "matches": {
            0: "Custom",
            15: "1v1",
            16: "2v2",
            17: "3v3",
            18: "4v4"
        }
    }
]);

export const player_colors = writable([
    {
        1: "blue",
        2: "red",
        3: "yellow",
        4: "green",
        5: "teal",
        6: "purple",
        7: "orange",
        8: "pink"
    }
]);

export const civs = writable([
    {
        0: "Abbasid Dynasty",
        1: "Chinese",
        2: "Delhi Sultanate",
        3: "English",
        4: "French",
        5: "Holy Roman Empire",
        6: "Mongols",
        7: "Rus"
    },
    {
        0: "./images/civs/CivIcon-AbbasidAoE4.png",
        1: "./images/civs/CivIcon-ChineseAoE4.png",
        2: "./images/civs/CivIcon-DelhiAoE4.png",
        3: "./images/civs/CivIcon-EnglishAoE4.png",
        4: "./images/civs/CivIcon-FrenchAoE4.png",
        5: "./images/civs/CivIcon-HREAoE4.png",
        6: "./images/civs/CivIcon-MongolsAoE4.png",
        7: "./images/civs/CivIcon-RusAoE4.png"
    }
]);

export const maps = writable([
    {
        0: "Dry Arabia",
        1: "Lipany",
        2: "High View",
        3: "Mountain Pass",
        4: "Ancient Spires",
        5: "Danube River",
        6: "Black Forest",
        7: "Mongolian Heights",
        8: "Altai",
        9: "Confluence",
        10: "French Pass",
        11: "Hill and Dale",
        12: "King of the Hill",
        13: "Warring Islands",
        14: "Archipelago",
        15: "Nagari",
        16: "Boulder Bay"
    },
    {
        0: "./images/maps/Arabia_AoE4.png",
        1: "./images/maps/Lipany_AoE4.png",
        2: "./images/maps/High_View_AoE4.png",
        3: "./images/maps/Mountain_Pass_AoE4.png",
        4: "./images/maps/Ancient_Spires_AoE4.png",
        5: "./images/maps/Danube_River_AoE4.png",
        6: "./images/maps/Black_Forest_AoE4.png",
        7: "./images/maps/Mongolian_Heights_AoE4.png",
        8: "./images/maps/Altai_AoE4.png",
        9: "./images/maps/Confluence_AoE4.png",
        10: "./images/maps/French_Pass_AoE4.png",
        11: "./images/maps/Hill_and_Dale_AoE4.png",
        12: "./images/maps/King_of_the_Hill_AoE4.png",
        13: "./images/maps/Warring_Islands_AoE4.png",
        14: "./images/maps/Archipelago_AoE4.png",
        15: "./images/maps/Nagari_AoE4.png",
        16: "./images/maps/Boulder_Bay_AoE4.png"
    }
]);
