vim.g.mapleader = " "

local keymap = vim.keymap

-- editing
keymap.set("i", "jk", "<Esc>")
keymap.set("i", "<C-h>", "<C-w>") -- backspace 1 word
keymap.set("i", "<C-Del>", "<C-o>dw") -- delete 1 word
keymap.set("v", "<C-a>", "<Esc>ggVG") -- select all text in file

-- splitting
keymap.set("n", "<leader>sv", "<C-w>v") -- split vertical
keymap.set("n", "<leader>ss", "<C-w>s") -- split horizontal
keymap.set("n", "<leader>se", "<C-w>=") -- split equal
keymap.set("n", "<leader>sc", "<C-w>c") -- close window

keymap.set("n", "<leader>sh", "<C-w>h") -- navigate to left window
keymap.set("n", "<leader>sj", "<C-w>j") -- navigate to bottom window
keymap.set("n", "<leader>sk", "<C-w>k") -- navigate to above window
keymap.set("n", "<leader>sl", "<C-w>l") -- navigate to right window

-- tabbing
keymap.set("n", "<leader>to", ":tabnew<CR>") -- open tab
keymap.set("n", "<leader>tc", ":tabclose<CR>") -- close tab
keymap.set("n", "<leader>tn", ":tabn<CR>") -- next tab
keymap.set("n", "<leader>tp", ":tabp<CR>") -- prev tab

-- scrolling
keymap.set("n", "<C-d>", "<C-d>zz")
keymap.set("n", "<C-u>", "<C-u>zz")
keymap.set("v", "<C-d>", "<C-d>zz")
keymap.set("v", "<C-u>", "<C-u>zz")
