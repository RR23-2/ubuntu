local opt = vim.opt

opt.clipboard:append("unnamedplus") -- clipboard

-- line
opt.relativenumber = true -- relative number
opt.number = true -- line numbering

-- indentation
opt.tabstop = 2
opt.shiftwidth = 2
opt.expandtab = true
opt.autoindent = true

-- search
opt.ignorecase = true
opt.smartcase = true

-- apperance
opt.termguicolors = true
opt.background = "dark"
opt.signcolumn = "yes"

-- backspace
opt.backspace = "indent,eol,start"

opt.iskeyword:append("-")

vim.cmd([[
    highlight Normal guibg=NONE ctermbg=NONE
    highlight LineNr guibg=NONE ctermbg=NONE
    highlight SignColumn guibg=NONE ctermbg=NONE
    highlight EndOfBuffer guibg=NONE ctermbg=NONE
    highlight TabLine guibg=NONE ctermbg=NONE
    highlight TabLineFill guibg=NONE ctermbg=NONE
    highlight TabLineSel guibg=NONE ctermbg=NONE
    highlight StatusLine guibg=NONE ctermbg=NONE
    highlight StatusLineNC guibg=NONE ctermbg=NONE
    highlight LualineNormal guibg=NONE ctermbg=NONE
    highlight LualineInsert guibg=NONE ctermbg=NONE
    highlight LualineVisual guibg=NONE ctermbg=NONE
    highlight LualineReplace guibg=NONE ctermbg=NONE
    highlight LualineCommand guibg=NONE ctermbg=NONE
    highlight LualineInactive guibg=NONE ctermbg=NONE
]])
