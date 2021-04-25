#!/usr/bin/env ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :
require 'pathname'
require 'fileutils'

module Fastlane
  module Actions
		class UpdateProvisioningProfileAction < Action
			def self.run(params)
				require 'xcodeproj'
        # Print table
        
				FastlaneCore::PrintTable.print_values(
          config: params,
          title: 'Summary for Update Provisioning Profile Action',
          mask_keys: %w(access_key)
        )

				profile_id = sh("./fastlane/actions/find_provisioning_profile.sh \"" + params[:new_specifier] + "\"")
        profile_id = profile_id.split(".")[0]

        profile_specifier_key = 'PROVISIONING_PROFILE'
        specifier_key = 'PROVISIONING_PROFILE_SPECIFIER'

        # assign folder from the parameter or search for an .xcodeproj file
        pdir = params[:xcodeproj] || Dir["*.xcodeproj"].first

        # validate folder
        project_file_path = File.join(pdir, "project.pbxproj")
        UI.user_error!("Could not find path to project config '#{project_file_path}'. Pass the path to your project (NOT workspace!)") unless File.exist?(project_file_path)
        target = params[:target]
        configuration = params[:configuration]

        project = Xcodeproj::Project.open(pdir)
        project.targets.each do |t|
          if !target || t.name.match(target)
            UI.success("Updating target #{t.name}")
          else
            UI.important("Skipping target #{t.name} as it doesn't match the filter '#{target}'")
            next
          end

          t.build_configuration_list.build_configurations.each do |config|
            if !configuration || config.name.match(configuration)
              UI.success("Updating configuration #{config.name}")
            else
              UI.important("Skipping configuration #{config.name} as it doesn't match the filter '#{configuration}'")
              next
            end

            config.build_settings[profile_specifier_key] = profile_id
            config.build_settings[specifier_key] = params[:new_specifier]
          end
        end
        project.save

        UI.success("Successfully updated project settings in '#{params[:xcodeproj]}'")
			end

      #####################################################
      # @!group Documentation
      #####################################################

      def self.description
        'Updates provisioning profile for the supplied Xcode project'
      end

      def self.details
        # Optional:
        # this is your chance to provide a more detailed description of this action
        ''
      end

      def self.output
        # Define the shared values you are going to provide
        # Example
        # [
        #   ['AWS_DEVICE_FARM_CUSTOM_VALUE', 'A description of what this value contains']
        # ]
      end

      def self.available_options
        # Define all options your action supports.
        [
          FastlaneCore::ConfigItem.new(
            key: :xcodeproj,
       env_name: "UPDATE_PROVISIONING_PROFILE_SPECIFIER_XCODEPROJ",
    description: "Path to the .xcodeproj file",
       optional: true,
   verify_block: proc do |value|
                   UI.user_error!("Path to Xcode project file is invalid") unless File.exist?(value)
                 end
          ),
          FastlaneCore::ConfigItem.new(
            key: :target,
       env_name: "UPDATE_PROVISIONING_PROFILE_SPECIFIER_TARGET",
    description: "The target for which to change the Provisioning Profile Specifier. If unspecified the change will be applied to all targets",
       optional: true
          ),
          FastlaneCore::ConfigItem.new(
            key: :configuration,
       env_name: "UPDATE_PROVISIONING_PROFILE_SPECIFIER_CONFIGURATION",
    description: "The configuration for which to change the Provisioning Profile Specifier. If unspecified the change will be applied to all configurations",
       optional: true
          ),
          FastlaneCore::ConfigItem.new(
            key: :new_specifier,
       env_name: "UPDATE_PROVISIONING_PROFILE_SPECIFIER_NEW_SPECIFIER",
    description: "Name of the new provisioning profile specifier to use, or to append to the existing value",
       optional: false
          ),
        ]
      end

      def self.return_value
        # If you method provides a return value, you can describe here what it does
      end

      def self.authors
        # So no one will ever forget your contribution to fastlane :) You are awesome btw!
        ['AidenMontgomery']
      end

      def self.is_supported?(platform)
        return true
      end
    end
	end
end