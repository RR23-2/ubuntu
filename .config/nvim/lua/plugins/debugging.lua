return {
	"mfussenegger/nvim-dap",
	dependencies = {
		"rcarriga/nvim-dap-ui",
		"nvim-neotest/nvim-nio",
	},
	config = function()
		local dap, dapui = require("dap"), require("dapui")

		dapui.setup()

		-- python
		dap.adapters.python = function(cb, config)
			if config.request == "attach" then
				local port = (config.connect or config).port
				local host = (config.connect or config).host or "127.0.0.1"
				cb({
					type = "server",
					port = assert(port, "`connect.port` is required for a python `attach` configuration"),
					host = host,
					options = {
						source_filetype = "python",
					},
				})
			else
				cb({
					type = "executable",
					command = "/usr/bin/python3",
					args = { "-m", "debugpy.adapter" },
					options = {
						source_filetype = "python",
					},
				})
			end
		end

		dap.configurations.python = {
			{
				type = "python",
				request = "launch",
				name = "Launch file",
				program = "${file}",
				pythonPath = function()
					return "/usr/bin/python3"
				end,
			},
		}

		dap.listeners.before.attach.dapui_config = function()
			dapui.open()
		end
		dap.listeners.before.launch.dapui_config = function()
			dapui.open()
		end
		dap.listeners.before.event_terminated.dapui_config = function()
			-- dapui.close()
		end
		dap.listeners.before.event_exited.dapui_config = function()
			-- dapui.close()
		end

		vim.api.nvim_set_keymap(
			"n",
			"<Leader>dd",
			':lua require("dapui").close()<CR>',
			{ noremap = true, silent = true }
		)

		vim.keymap.set("n", "<Leader>b", function()
			require("dap").toggle_breakpoint()
		end)
		vim.keymap.set("n", "<F5>", function()
			require("dap").continue()
		end)
	end,
}
