import { Janitor } from "@rbxts/janitor";
import { darkIcons, lightIcons } from "./Icons"
import { UserInputService } from "@rbxts/services";

namespace InputUtils
{
	const garbageCollection = new Janitor<{ [ActionName: string]: () => void }>();

	export type ActionCallback = (ActionName: string, State: Enum.UserInputState, Input: InputObject) => Enum.ContextActionResult | undefined;

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


	export function createAction(ActionName: string, Callback: ActionCallback, CreateTouchButton: boolean, ... InputTypes: (Enum.KeyCode | Enum.UserInputType)[])
	{
		if (garbageCollection.Get(ActionName) !== undefined) {
			warn(`[InputUtils]: Action "${ActionName}" already exists!`)
			return
		}

		const commitAction = (State: Enum.UserInputState, Input: InputObject) =>
		{
			
		}

		const inputChangedConnection = UserInputService.InputChanged.Connect(Input =>
		{
			
		})

		const inputBeganConnection = UserInputService.InputBegan.Connect(Input =>
		{

		})

		const inputEndedConnection = UserInputService.InputEnded.Connect(Input =>
		{

		})

		garbageCollection.Add((
			() => {
				inputChangedConnection.Disconnect()
				inputBeganConnection.Disconnect()
				inputEndedConnection.Disconnect()
			}
		), true, ActionName)
	}

	export function destroyAction(ActionName: string)
	{
		garbageCollection.Remove(ActionName)
	}
};

export default InputUtils;