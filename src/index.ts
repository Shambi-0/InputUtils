import { darkIcons, lightIcons } from "./Icons"

namespace InputUtils
{
	/**
	 * @description Gets the prompt for a given keycode.
	 * @param { Enum.KeyCode | Enum.UserInputType } Keycode The keycode to get the prompt for.
	 * @param { boolean } [ Light ] Whether or not to get the light theme prompt.
	 * @returns { string } The prompt for the keycode, as an "rbxassetid".
	 */
	export function getButtonPrompt(Keycode: Enum.KeyCode | Enum.UserInputType, Light: boolean = false): string
	{
		const result = (Light ? lightIcons : darkIcons).get(Keycode)

		if (result === undefined) warn(`[InputUtils]: No prompt found for "${Keycode}"!`)

		return result ? `rbxassetid://${result}` : ""
	}
};

export default InputUtils;