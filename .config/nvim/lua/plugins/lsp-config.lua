return {
  {
    "williamboman/mason.nvim",
    config = function()
      require("mason").setup()
    end,
  },
  {
    "williamboman/mason-lspconfig.nvim",
    config = function()
      require("mason-lspconfig").setup({
        ensure_installed = {
          -- "lua_ls",
          "tsserver",
          "pyright",
          -- "pylsp",
          -- "ast_grep",
          -- "volar"
        },
      })
    end,
  },
  {
    "neovim/nvim-lspconfig",
    config = function()
      local capabilities = require("cmp_nvim_lsp").default_capabilities()

      local lspconfig = require("lspconfig")
      lspconfig.lua_ls.setup({
        capabilities = capabilities,
      })
      lspconfig.tsserver.setup({
        capabilities = capabilities,
      })
      lspconfig.ast_grep.setup({
        capabilities = capabilities,
      })
      lspconfig.volar.setup({
        capabilities = capabilities,
        filetypes = { "typescript", "javascript", "javascriptreact", "typescriptreact", "vue", "json" },
      })
      lspconfig.pyright.setup({
        capabilities = capabilities,
      })
      -- lspconfig.pylsp.setup({
      --   settings = {
      --     pylsp = {
      --       plugins = {
      --         pycodestyle = {
      --           ignore = { "W391" },
      --           maxLineLength = 100,
      --         },
      --       },
      --     },
      --   },
      --   capabilities = capabilities,
      -- })
      vim.keymap.set("n", "K", vim.lsp.buf.hover, {})
      vim.keymap.set("n", "gd", vim.lsp.buf.definition, {})
      vim.keymap.set("n", "<leader>ca", vim.lsp.buf.code_action, {})
    end,
  },
}
